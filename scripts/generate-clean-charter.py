#!/usr/bin/env python3
"""
GENERATE CLEAN CITIZEN'S CHARTER DATA (Morong, Rizal - 2025 Edition)
Cross-references TOC, page ranges, tables, and directory from files/CITIZEN-CHARTER-2025.pdf
to produce:
  1. files/CITIZEN-CHARTER-2025.json (Comprehensive schema)
  2. src/data/citizensCharter.json (Frontend-optimized for React explorer)
  3. files/CITIZEN-CHARTER-2025.md (Clean, readable GitHub-flavored Markdown)
"""

import sys
import os
import re
import json
import time
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import pdfplumber

PDF_PATH = Path("public/files/CITIZEN-CHARTER-2025.pdf") if Path("public/files/CITIZEN-CHARTER-2025.pdf").exists() else Path("files/CITIZEN-CHARTER-2025.pdf")
JSON_RAW_PATH = Path("public/files/CITIZEN-CHARTER-2025.json") if Path("public/files/CITIZEN-CHARTER-2025.json").exists() else Path("files/CITIZEN-CHARTER-2025.json")
MD_OUT = Path("public/files/CITIZEN-CHARTER-2025.md")
FRONTEND_JSON_PATH = Path("src/data/citizensCharter.json")

# Department Heads Directory from Page 252-253
DEPARTMENT_HEADS = {
    "Office of the Municipal Assessor": {"head": "Ms. Emiline Garrovillas", "designation": "Municipal Assessor"},
    "Office of the Municipal Treasury": {"head": "Ms. Maria Teresa Garrovillas", "designation": "Municipal Treasurer"},
    "Office of the Local Civil Registrar": {"head": "Ms. Catherine Valiente", "designation": "Municipal Civil Registrar"},
    "Office of the Municipal Tourism": {"head": "Ms. Shieldeen B. Soriano", "designation": "Municipal Tourism Officer"},
    "Municipal Health Office": {"head": "Dr. Ana Karina M. Mariano, MD", "designation": "Municipal Health Officer"},
    "Business Permits and Licensing Office (BPLO)": {"head": "Engr. Bayani Sunga", "designation": "BPLO Head"},
    "Municipal Social Welfare and Development Office (MSWDO)": {"head": "Ms. Joahnna Mauline L. Santiago", "designation": "MSWD Officer"},
    "Office of the Municipal Planning and Development Coordinator (MPDC)": {"head": "Ms. Maribeth C. Felix", "designation": "MPDC Head"},
    "Office of the Municipal Engineer": {"head": "Engr. Bayani Sunga", "designation": "Municipal Engineer"},
    "Office of the Municipal Agriculturist": {"head": "Ms. Arlene T. Esmama", "designation": "Municipal Agriculturist"},
    "Market and Slaughterhouse Services": {"head": "Market & Slaughterhouse Administrator", "designation": "Supervisor"},
    "Office of the Municipal Accountant": {"head": "Municipal Accountant", "designation": "Municipal Accountant"},
    "General Services Office (GSO)": {"head": "Mr. David Emmanuel SE. Soriano", "designation": "GSO Head"},
    "Public Employment Service Office (PESO)": {"head": "PESO Manager", "designation": "PESO Manager"},
    "Office of the Human Resource Management (HRMO)": {"head": "Mr. Teodoro S. Trinidad", "designation": "HRMO Head"},
    "Office of the Municipal Budget Officer": {"head": "Ms. Leni Pascual", "designation": "Municipal Budget Officer"},
    "Office of the Sangguniang Bayan": {"head": "Mr. Bernadette E. Valiente", "designation": "Secretary to the Sanggunian"},
    "Housing and Resettlement Section / MENRO": {"head": "Engr. Gem James R. Castillon", "designation": "MENR Officer"},
    "Disaster Risk Reduction and Management Office (MDRRMO)": {"head": "Mr. Jerome L. Mateo", "designation": "MDRRM Officer"}
}

TOC_ENTRIES = [
    (1, "Issuance of Revised Tax Declarations", "Office of the Municipal Assessor", 10, 11),
    (2, "Issuance of Certified Computer Print-out of the Tax Declaration", "Office of the Municipal Assessor", 12, 12),
    (3, "Issuance of No-Improvement / Certificate of No-Property and Other Certifications", "Office of the Municipal Assessor", 13, 14),
    (4, "Provision of Re-assessment, Revision, Cancellation of Assessment of Real Property Tax", "Office of the Municipal Assessor", 15, 17),
    (5, "Assessment of Newly Discovered Property (Land); Newly Constructed Building/ Machines and Issuance of Updated Tax Declarations", "Office of the Municipal Assessor", 18, 20),
    (6, "Verification of History of Real Property Assessment/Tax Declaration", "Office of the Municipal Assessor", 21, 21),
    (7, "Verification of Property Location and Vicinity", "Office of the Municipal Assessor", 22, 24),
    (8, "Collection of Business Tax", "Office of the Municipal Treasury", 25, 25),
    (9, "Collection of Community Tax Certificate (CTC) - Individual", "Office of the Municipal Treasury", 26, 26),
    (10, "Collection of Community Tax Certificate (CTC) - Corporation", "Office of the Municipal Treasury", 27, 28),
    (11, "Collection of Regulatory Fees and Charges", "Office of the Municipal Treasury", 29, 29),
    (12, "Collection of Real Property Tax (RPT / Amilyar)", "Office of the Municipal Treasury", 30, 31),
    (13, "Issuance of Tax Clearance", "Office of the Municipal Treasury", 32, 32),
    (14, "Registration of Large Cattle", "Office of the Municipal Treasury", 33, 33),
    (15, "Transfer of Large Cattle", "Office of the Municipal Treasury", 34, 34),
    (16, "Issuance of Treasury Certification", "Office of the Municipal Treasury", 35, 36),
    (17, "Collection of Transfer Tax", "Office of the Municipal Treasury", 37, 37),
    (18, "Issuance of Transfer Tax Certificate", "Office of the Municipal Treasury", 38, 38),
    (19, "Calibration of Gasoline Dispensing Pumps", "Office of the Municipal Treasury", 39, 40),
    (20, "Ordinance Violation Receipt (OVR)", "Office of the Municipal Treasury", 41, 43),
    (21, "Municipal Impounding Services", "Office of the Municipal Treasury", 44, 44),
    (22, "Road Worthiness Clearance", "Office of the Municipal Treasury", 45, 46),
    (23, "Registering Births and Issuance of Certificate of Live Birth (COLB)", "Office of the Local Civil Registrar", 47, 48),
    (24, "Registering Foundlings", "Office of the Local Civil Registrar", 49, 49),
    (25, "Registering / Issuance of Death Certificates", "Office of the Local Civil Registrar", 50, 51),
    (26, "Issuance of a Marriage License", "Office of the Local Civil Registrar", 52, 54),
    (27, "Registering Marriage Certificates", "Office of the Local Civil Registrar", 55, 56),
    (28, "Issuance of Certified Photocopy / True Transcription of Births, Deaths and Marriages", "Office of the Local Civil Registrar", 57, 57),
    (29, "Processing Petitions under RA 9048 / RA 10172 (Correction of Clerical Error or Change of Name, Gender, DOB)", "Office of the Local Civil Registrar", 58, 60),
    (30, "Registering Legal Instruments", "Office of the Local Civil Registrar", 61, 62),
    (31, "Endorsements of Births, Deaths and Marriages to PSA", "Office of the Local Civil Registrar", 63, 63),
    (32, "Issuance of Civil Registry Documents through Batch Request Entry System (BREQS)", "Office of the Local Civil Registrar", 64, 64),
    (33, "Registering Court Orders Affecting Civil Status", "Office of the Local Civil Registrar", 65, 66),
    (34, "Research, Interview, and Public Information Request", "Office of the Municipal Tourism", 67, 67),
    (35, "Request for the Use of Media Feature and Municipal Facilities", "Office of the Municipal Tourism", 68, 69),
    (36, "Tour Coordination and Visitor Assistance", "Office of the Municipal Tourism", 70, 70),
    (37, "Provision of Medical Consultation", "Municipal Health Office", 71, 71),
    (38, "Expanded Program on Immunization (OPV, BCG, DPT, Hepa B, TT and Measles)", "Municipal Health Office", 72, 72),
    (39, "Maternal and Child Care Service (Barangay Health Stations)", "Municipal Health Office", 73, 74),
    (40, "Family Planning Services (Barangay Health Stations)", "Municipal Health Office", 75, 75),
    (41, "BEmONC (Paanakan Birthing Clinic) – RHU 1", "Municipal Health Office", 76, 78),
    (42, "Issuance of Medical Certificate and Medico-Legal Certificate", "Municipal Health Office", 79, 79),
    (43, "Issuance of Pink Card (Occupational Health Permit)", "Municipal Health Office", 80, 80),
    (44, "Issuance of Sanitary Permit to Operate", "Municipal Health Office", 81, 81),
    (45, "Issuance of Health Certificate for Food and Non-Food Handlers", "Municipal Health Office", 82, 83),
    (46, "Provision of the National TB Control Program (DOTS)", "Municipal Health Office", 84, 84),
    (47, "Provision of the Leprosy Control Program", "Municipal Health Office", 85, 86),
    (48, "Social Hygiene Clinic (STI / HIV / AIDS Screening)", "Municipal Health Office", 87, 87),
    (49, "Availment of Clinical Laboratory Services", "Municipal Health Office", 88, 90),
    (50, "Laboratory Sputum Services for TB Patients", "Municipal Health Office", 91, 92),
    (51, "Availing of Newborn Screening", "Municipal Health Office", 93, 93),
    (52, "Availing Animal Bite Treatment and Anti-Rabies Vaccine", "Municipal Health Office", 94, 94),
    (53, "Adolescent Health and Youth Development Program (AHYDP)", "Municipal Health Office", 95, 96),
    (54, "Business Registration (New / Renewal) and Working Permits", "Business Permits and Licensing Office (BPLO)", 98, 104),
    (55, "Issuance of Certificate of Indigency", "Municipal Social Welfare and Development Office (MSWDO)", 106, 106),
    (56, "Issuance of Person with Disability Identification Card (PWD ID and Purchase Booklet)", "Municipal Social Welfare and Development Office (MSWDO)", 107, 107),
    (57, "Issuance of Senior Citizen Identification Card (Senior Citizen ID and Purchase Booklet)", "Municipal Social Welfare and Development Office (MSWDO)", 108, 108),
    (58, "Issuance of Solo Parent Identification Card (Solo Parent ID)", "Municipal Social Welfare and Development Office (MSWDO)", 109, 109),
    (59, "Municipal Scholarship Program Assistance", "Municipal Social Welfare and Development Office (MSWDO)", 110, 110),
    (60, "Early Childhood Care and Development (Daycare Services)", "Municipal Social Welfare and Development Office (MSWDO)", 111, 111),
    (61, "Social Case Study Report Preparation", "Municipal Social Welfare and Development Office (MSWDO)", 112, 113),
    (62, "PhilHealth ng Masa Enrollment Assistance", "Municipal Social Welfare and Development Office (MSWDO)", 114, 114),
    (63, "Violence Against Women and Their Children (VAWC) Welfare Program", "Municipal Social Welfare and Development Office (MSWDO)", 115, 115),
    (64, "Children in Conflict with the Law (CICL) Intervention and Protective Custody", "Municipal Social Welfare and Development Office (MSWDO)", 116, 117),
    (66, "Issuance of Locational Clearance / Development Permit for Projects not Requiring SB Approval", "Office of the Municipal Planning and Development Coordinator (MPDC)", 119, 140),
    (67, "Issuance of Zoning Clearance and Certification (including Free Patent Titling)", "Office of the Municipal Planning and Development Coordinator (MPDC)", 141, 150),
    (68, "Building Permits, Ancillary Permits and Certificates of Occupancy", "Office of the Municipal Engineer", 151, 163),
    (69, "Anti-Rabies Animal Vaccination", "Office of the Municipal Agriculturist", 165, 165),
    (70, "Anti-Rabies Mass Community Vaccination", "Office of the Municipal Agriculturist", 166, 166),
    (71, "Animal Treatment and Livestock Check-Up", "Office of the Municipal Agriculturist", 167, 167),
    (72, "Livestock Deworming and Parasite Control", "Office of the Municipal Agriculturist", 168, 168),
    (73, "Vegetable Seeds and Seedling Distribution", "Office of the Municipal Agriculturist", 169, 169),
    (74, "Organic Fertilizer and Bio-Concoctions Provision", "Office of the Municipal Agriculturist", 170, 170),
    (75, "Availment of Knapsack Sprayer, P.E. Hose and Agricultural Technical Assistance", "Office of the Municipal Agriculturist", 171, 171),
    (76, "Valuation and Appraisal of Agricultural Trees and Crops", "Office of the Municipal Agriculturist", 172, 172),
    (77, "Availment of High Quality Certified Rice and Corn Seeds", "Office of the Municipal Agriculturist", 173, 173),
    (78, "Provisions of Field Tractor, Agricultural Machinery and Equipment", "Office of the Municipal Agriculturist", 174, 174),
    (79, "Availment of Freshwater Fish Fingerlings (Tilapia / Bangus)", "Office of the Municipal Agriculturist", 175, 175),
    (80, "Availment of Gill Nets, Fishing Gears and Motorized Banca Assistance", "Office of the Municipal Agriculturist", 176, 176),
    (81, "Upland Fisheries and Aquaculture Development Program", "Office of the Municipal Agriculturist", 177, 177),
    (82, "Motorized Banca Municipal Registration and Licensing", "Office of the Municipal Agriculturist", 178, 178),
    (83, "Provision of Agricultural Information and Farmers' Training Seminars", "Office of the Municipal Agriculturist", 179, 180),
    (84, "Capability Building for Farmers, Rural Women and Youth Cooperatives", "Office of the Municipal Agriculturist", 181, 181),
    (85, "Livestock and Poultry Dispersal Program", "Office of the Municipal Agriculturist", 182, 182),
    (86, "Issuance of Butcher’s Certification, Farmer’s Certification and Animal Vaccination Certificate", "Office of the Municipal Agriculturist", 183, 184),
    (87, "Slaughtering of Livestock (Hogs, Cattle, Goats) at Municipal Slaughterhouse", "Market and Slaughterhouse Services", 186, 187),
    (88, "Renewal of Butcher’s License and Meat Handler’s Permit", "Market and Slaughterhouse Services", 188, 189),
    (89, "Issuance of Certificate of Premium Contribution and/or Loan Payment", "Office of the Municipal Accountant", 191, 191),
    (90, "Rental of Personal and Real Properties Owned by the Municipality (Gyms, Stalls, Equipment)", "General Services Office (GSO)", 195, 197),
    (91, "Issuance of Employment Recommendation Letter", "Public Employment Service Office (PESO)", 199, 199),
    (92, "Posting of Local and Overseas Job Vacancies", "Public Employment Service Office (PESO)", 200, 200),
    (93, "Browsing of Job Applicants and Employer Referral", "Public Employment Service Office (PESO)", 201, 202),
    (94, "Application for Special Program for Employment of Students (SPES)", "Public Employment Service Office (PESO)", 203, 205),
    (95, "Application to Municipal Job Vacancies (Job Order Positions)", "Office of the Human Resource Management (HRMO)", 207, 208),
    (96, "Application to Municipal Job Vacancies (Plantilla Permanent Positions)", "Office of the Human Resource Management (HRMO)", 209, 210),
    (97, "Work Immersion Program for Senior High School Students", "Office of the Human Resource Management (HRMO)", 211, 212),
    (98, "On-the-Job Training / Internship Program for College Students", "Office of the Human Resource Management (HRMO)", 213, 213),
    (99, "Client Assistance Provision for Civil Service Examination", "Office of the Human Resource Management (HRMO)", 214, 215),
    (100, "Issuance of Certificate of Non-Employment / Unemployment", "Office of the Human Resource Management (HRMO)", 216, 216),
    (101, "Request for Service Records and Employment Certifications (Internal)", "Office of the Human Resource Management (HRMO)", 217, 217),
    (102, "Client Assistance Provision for Landbank e-Salary Loan", "Office of the Human Resource Management (HRMO)", 218, 220),
    (103, "Application for Employee Training and Capability Development", "Office of the Human Resource Management (HRMO)", 221, 222),
    (104, "Pre-Marriage Orientation and Counselling (PMOC)", "Office of the Human Resource Management (HRMO) / MSWDO", 223, 225),
    (105, "Issuance of Burial Permit and Municipal Cemetery Management", "Office of the Human Resource Management (HRMO) / Municipal Cemetery", 226, 229),
    (106, "Issuance of Certificate of Appropriation Balances", "Office of the Municipal Budget Officer", 231, 231),
    (107, "Cancelation of Obligation and Budget Re-alignment", "Office of the Municipal Budget Officer", 231, 232),
    (108, "Issuance of Certified Copy of Sangguniang Bayan Documents and Ordinances", "Office of the Sangguniang Bayan", 233, 234),
    (109, "Issuance of LGU Housing and Tenancy Certificates", "Housing and Resettlement Section / MENRO", 238, 239),
    (110, "Availment of Municipal Socialized Housing and Relocation Projects", "Housing and Resettlement Section / MENRO", 240, 241),
    (111, "Request for DRRM Training, Orientation, and Capacity Building Activities", "Disaster Risk Reduction and Management Office (MDRRMO)", 242, 242),
    (112, "Request for Use of LDRRMO Support Vehicles (Rescue Trucks, Utility)", "Disaster Risk Reduction and Management Office (MDRRMO)", 243, 243),
    (113, "24/7 Request for LDRRMO Ambulance and Emergency Patient Transport (Free)", "Disaster Risk Reduction and Management Office (MDRRMO)", 244, 244),
    (114, "24/7 Chainsaw and Tree Trimming Clearing Operations (Pre-Disaster / Free)", "Disaster Risk Reduction and Management Office (MDRRMO)", 245, 245),
    (115, "Issuance of Certification on Disaster-Affected Area, Damages and Calamity Loans (Free)", "Disaster Risk Reduction and Management Office (MDRRMO)", 246, 246),
    (116, "Issuance of Certification on Hazard and Risk Assessment (Free)", "Disaster Risk Reduction and Management Office (MDRRMO)", 247, 247)
]

def normalize_text(text: str) -> str:
    if not text:
        return ""
    text = text.replace('\uf046', '[x]')
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '--')
    text = text.replace('\u2022', '•')
    text = text.replace('\u00a0', ' ')
    text = text.replace('\U0001f5b5', '💻')
    text = text.replace('\u20b1', '₱')
    return text

def clean_cell(val):
    if val is None:
        return ""
    v = normalize_text(str(val))
    v = re.sub(r'\s*\n\s*', ' ', v)
    v = re.sub(r'[ \t]+', ' ', v)
    return v.strip()

def main():
    print("Reading files/CITIZEN-CHARTER-2025.json for raw page extractions...")
    with open(JSON_RAW_PATH, "r", encoding="utf-8") as f:
        raw_doc = json.load(f)
        
    pages = {p["page"]: p for p in raw_doc["pages"]}
    
    services_list = []
    
    for s_num, s_title, office_name, p_start, p_end in TOC_ENTRIES:
        # Aggregate text and tables across the page range
        about_text = ""
        classification = "Simple"
        transaction_type = "G2C - Government to Citizen"
        who_may_avail = "Residents and Taxpayers of Morong, Rizal"
        requirements = []
        procedures = []
        total_fees = "None"
        total_time = "30 Minutes"
        
        dept_info = DEPARTMENT_HEADS.get(office_name, {"head": "Department Head", "designation": "Head"})
        
        for p_idx in range(p_start, p_end + 1):
            p_data = pages.get(p_idx)
            if not p_data:
                continue
                
            # Outside lines
            lines = p_data.get("outside_text_lines", [])
            for l in lines:
                if l.startswith("ABOUT THE SERVICE:"):
                    about_text = l.replace("ABOUT THE SERVICE:", "").strip()
                elif "Objective" in l and not about_text:
                    about_text = l.replace("Objective", "").strip()
                    
            # Tables
            for t in p_data.get("tables", []):
                for row in t:
                    row_clean = [clean_cell(c) for c in row if c is not None]
                    row_str = " ".join(row_clean).lower()
                    
                    if "classification" in row_str:
                        for cell in row_clean:
                            for cl in ["Simple", "Complex", "Highly Technical"]:
                                if cl.lower() in cell.lower():
                                    classification = cl
                                    break
                    if "type of transaction" in row_str or "type of transportation" in row_str:
                        for cell in row_clean:
                            for tt in ["G2C", "G2B", "G2G"]:
                                if tt.lower() in cell.lower():
                                    if "citizen" in cell.lower():
                                        transaction_type = "G2C - Government to Citizen"
                                    elif "business" in cell.lower() or "client" in cell.lower():
                                        transaction_type = "G2B - Government to Business"
                                    elif "government" in cell.lower():
                                        transaction_type = "G2G - Government to Government"
                                    else:
                                        transaction_type = tt
                                    break
                    if "who may avail" in row_str:
                        idx_match = -1
                        for idx, cell in enumerate(row_clean):
                            if "who may avail" in cell.lower():
                                idx_match = idx
                                break
                        if idx_match != -1 and idx_match + 1 < len(row_clean):
                            val = " ".join(c for c in row_clean[idx_match+1:] if c)
                            if val:
                                who_may_avail = val
                                
                    # Procedure steps detection (5-column format)
                    if len(row_clean) >= 4 and any(kw in row_str for kw in ["minute", "hour", "day", "none", "php", "total", "p "]):
                        if any(hdr in row_str for hdr in ["client steps", "checklist of requirements", "where to secure"]):
                            continue
                        if "total:" in row_str or "total" in row_str:
                            for c in row_clean:
                                if any(curr in c.upper() for curr in ["PHP", "P ", "₱"]):
                                    total_fees = c
                                elif any(tm in c.lower() for tm in ["minute", "hour", "day"]):
                                    total_time = c
                        else:
                            step_desc = row_clean[0]
                            agency_act = row_clean[1] if len(row_clean) > 1 else ""
                            fee_val = row_clean[2] if len(row_clean) > 2 else "none"
                            proc_tm = row_clean[3] if len(row_clean) > 3 else ""
                            resp_pers = row_clean[4] if len(row_clean) > 4 else ""
                            
                            if step_desc or agency_act:
                                procedures.append({
                                    "client_step": step_desc,
                                    "agency_action": agency_act,
                                    "fees": fee_val,
                                    "processing_time": proc_tm,
                                    "person_responsible": resp_pers
                                })
                    # Requirements detection (2-column format)
                    elif len(row_clean) >= 2 and not any(meta_kw in row_str for meta_kw in ["office or division", "classification", "type of transaction", "who may avail", "client steps"]):
                        req_item = row_clean[0].strip()
                        sec_place = row_clean[-1].strip()
                        # Filter header row duplicates
                        if req_item.lower() not in ["checklist of requirements", "requirements", ""] and len(req_item) > 3:
                            if not any(r["requirement"] == req_item for r in requirements):
                                requirements.append({
                                    "requirement": req_item,
                                    "where_to_secure": sec_place if sec_place != req_item else "Client / Applicant"
                                })
                                
        if not about_text:
            about_text = f"Official frontline municipal service provided by the {office_name} in accordance with RA 11032."
            
        services_list.append({
            "service_number": s_num,
            "service_name": s_title,
            "office": office_name,
            "department_head": dept_info["head"],
            "department_designation": dept_info["designation"],
            "page_start": p_start,
            "page_end": p_end,
            "about": about_text,
            "classification": classification,
            "transaction_type": transaction_type,
            "who_may_avail": who_may_avail,
            "checklist_of_requirements": requirements,
            "procedures": procedures,
            "total_fees": total_fees,
            "total_processing_time": total_time
        })
        
    print(f"Parsed {len(services_list)} canonical services.")
    
    # Save optimized frontend JSON
    clean_frontend_data = {
        "metadata": {
            "document_title": "Citizen's Charter",
            "municipality": "Municipality of Morong",
            "province": "Rizal",
            "edition": "2025 Edition",
            "legal_basis": "Republic Act No. 9485 & Republic Act No. 11032",
            "services_count": len(services_list),
            "offices_count": len(DEPARTMENT_HEADS)
        },
        "vision": raw_doc["vision"],
        "mission": raw_doc["mission"],
        "mandate": raw_doc["mandate"],
        "goals_and_objectives": raw_doc.get("goals_and_objectives", []),
        "service_pledge": raw_doc["service_pledge"],
        "feedback_and_redress": raw_doc["feedback_and_redress"],
        "directory_of_officials": raw_doc["directory_of_officials"],
        "services": services_list
    }
    
    FRONTEND_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(FRONTEND_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(clean_frontend_data, f, indent=2, ensure_ascii=False)
    print(f"[OK] Saved frontend data to {FRONTEND_JSON_PATH} ({len(json.dumps(clean_frontend_data).encode('utf-8')) / 1024:.1f} KB)")
    
    # Also update files/CITIZEN-CHARTER-2025.json
    raw_doc["services"] = services_list
    raw_doc["metadata"]["services_count"] = len(services_list)
    with open(JSON_RAW_PATH, "w", encoding="utf-8") as f:
        json.dump(raw_doc, f, indent=2, ensure_ascii=False)
    print(f"[OK] Updated {JSON_RAW_PATH}")

if __name__ == "__main__":
    main()

