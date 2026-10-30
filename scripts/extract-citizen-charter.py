#!/usr/bin/env python3
"""
CITIZEN CHARTER EXTRACTOR (Morong, Rizal - 2025 Edition)
Extracts all 253 pages of files/CITIZEN-CHARTER-2025.pdf into:
  1. files/CITIZEN-CHARTER-2025.md (Full, structured, readable Markdown)
  2. files/CITIZEN-CHARTER-2025.json (Machine-readable structured JSON)

Ignores logos, eliminates repetitive running headers/page numbers,
preserves complete tables (requirements, steps, fees, processing time, person responsible),
and extracts front matter, DRRMO emergency services, ARTA redress mechanisms, and municipal directories.
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
MD_OUT = Path("public/files/CITIZEN-CHARTER-2025.md")
JSON_OUT = Path("public/files/CITIZEN-CHARTER-2025.json")

def normalize_text(text: str) -> str:
    if not text:
        return ""
    # Map private use glyphs and font-specific symbols
    text = text.replace('\uf046', '[x]')
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '--')
    text = text.replace('\u2022', '•')
    text = text.replace('\u00a0', ' ')
    text = text.replace('\U0001f5b5', '💻')
    text = text.replace('\u20b1', '₱')
    return text

def is_running_header_or_footer(line: str) -> bool:
    l = line.strip().upper()
    if not l:
        return True
    if re.match(r'^\d+$', l):
        return True
    if 'MUNICIPAL GOVERNMENT OF' in l:
        return True
    if l in ['MORONG, RIZAL', 'M O RONG, RIZAL']:
        return True
    if l in ["CITIZEN'S CHARTER", "CITIZENS CHARTER", "CITIZEN CHARTER", "CITIZEN’S CHARTER"]:
        return True
    return False

def clean_cell(val):
    if val is None:
        return ""
    v = normalize_text(str(val))
    # Replace internal newlines with space
    v = re.sub(r'\s*\n\s*', ' ', v)
    # Collapse multiple spaces
    v = re.sub(r'[ \t]+', ' ', v)
    return v.strip()

def format_markdown_table(rows):
    """
    Format a 2D list of strings as a GitHub-flavored Markdown table.
    """
    if not rows:
        return ""
    
    # Filter out empty rows
    cleaned_rows = []
    for r in rows:
        cr = [clean_cell(c) for c in r]
        # Ignore completely empty rows
        if any(cr):
            cleaned_rows.append(cr)
            
    if not cleaned_rows:
        return ""
    
    max_cols = max(len(r) for r in cleaned_rows)
    # Normalize row lengths
    for r in cleaned_rows:
        while len(r) < max_cols:
            r.append("")
            
    header = cleaned_rows[0]
    header_line = "| " + " | ".join(c.replace('|', '\\|') for c in header) + " |"
    separator_line = "| " + " | ".join(["---"] * max_cols) + " |"
    data_lines = []
    for r in cleaned_rows[1:]:
        data_lines.append("| " + " | ".join(c.replace('|', '\\|') for c in r) + " |")
        
    return "\n".join([header_line, separator_line] + data_lines)

def main():
    print(f"Opening {PDF_PATH}...")
    start_time = time.time()
    
    if not PDF_PATH.exists():
        print(f"Error: {PDF_PATH} does not exist!")
        sys.exit(1)
        
    pages_data = []
    
    with pdfplumber.open(PDF_PATH) as pdf:
        total_pages = len(pdf.pages)
        print(f"Processing {total_pages} pages...")
        
        for idx, page in enumerate(pdf.pages):
            page_num = idx + 1
            if page_num % 50 == 0 or page_num == total_pages:
                print(f"  Processed {page_num}/{total_pages} pages ({time.time() - start_time:.1f}s)...")
                
            tables = page.find_tables()
            table_bboxes = [t.bbox for t in tables]
            
            # Extract words outside tables
            words = page.extract_words()
            outside_words = []
            for w in words:
                in_table = any(
                    t[0] - 2 <= w['x0'] and w['x1'] <= t[2] + 2 and 
                    t[1] - 2 <= w['top'] and w['bottom'] <= t[3] + 2
                    for t in table_bboxes
                )
                if not in_table:
                    outside_words.append(w)
            
            # Reconstruct lines outside tables based on word coordinates
            outside_lines = []
            if outside_words:
                sorted_words = sorted(outside_words, key=lambda w: (w['top'], w['x0']))
                current_line = []
                last_top = None
                for w in sorted_words:
                    if last_top is None or abs(w['top'] - last_top) < 4:
                        current_line.append(w['text'])
                        last_top = w['top']
                    else:
                        outside_lines.append(" ".join(current_line))
                        current_line = [w['text']]
                        last_top = w['top']
                if current_line:
                    outside_lines.append(" ".join(current_line))
                    
            # Filter running headers
            filtered_outside_lines = []
            for line in outside_lines:
                norm_line = normalize_text(line)
                if not is_running_header_or_footer(norm_line):
                    filtered_outside_lines.append(norm_line)
                    
            # Extract tables content
            extracted_tables = []
            for t in tables:
                table_rows = t.extract()
                if table_rows:
                    cleaned_table = []
                    for row in table_rows:
                        cleaned_row = [clean_cell(c) for c in row]
                        if any(cleaned_row):
                            cleaned_table.append(cleaned_row)
                    if cleaned_table:
                        extracted_tables.append(cleaned_table)
                        
            # If no tables were found via find_tables, fallback to plain page text
            fallback_text_lines = []
            if not extracted_tables:
                raw_text = page.extract_text() or ""
                for line in raw_text.splitlines():
                    norm_line = normalize_text(line.strip())
                    if not is_running_header_or_footer(norm_line):
                        fallback_text_lines.append(norm_line)
                        
            pages_data.append({
                "page": page_num,
                "outside_text_lines": filtered_outside_lines,
                "fallback_text_lines": fallback_text_lines,
                "tables": extracted_tables
            })
            
    print(f"Extraction finished in {time.time() - start_time:.1f}s.")
    print("Formatting Markdown and JSON...")
    
    # -------------------------------------------------------------
    # 1. GENERATE MARKDOWN
    # -------------------------------------------------------------
    md_output = []
    md_output.append("# 🏛️ MUNICIPAL GOVERNMENT OF MORONG, RIZAL")
    md_output.append("## Citizen's Charter (2025 Edition)")
    md_output.append("")
    md_output.append("> **Compliance:** In compliance with Republic Act No. 9485 (Anti-Red Tape Act of 2007) and Republic Act No. 11032 (Ease of Doing Business and Efficient Government Service Delivery Act of 2018).  ")
    md_output.append("> **Source:** Municipal Government of Morong, Rizal, Philippines (253 pages)  ")
    md_output.append("> **Scope:** Complete directory of frontline municipal services, requirements, fees, processing times, and accountability officers.")
    md_output.append("")
    md_output.append("---")
    md_output.append("")
    
    for p in pages_data:
        p_num = p["page"]
        
        # Section markers for major pages
        if p_num == 3:
            md_output.append("## 🌟 Vision, Mission, Mandate, Goals & Objectives\n")
        elif p_num == 4:
            md_output.append("## 🤝 Service Pledge\n")
        elif p_num == 5:
            md_output.append("## 📋 Table of Contents / List of Services\n")
        elif p_num == 10:
            md_output.append("## 🏢 Frontline Municipal Services Directory\n")
        elif p_num == 242:
            md_output.append("## 🚨 Disaster Risk Reduction and Management Office (MDRRMO)\n")
        elif p_num == 248:
            md_output.append("## 📢 Feedback and Redress Mechanism\n")
        elif p_num == 252:
            md_output.append("## 📞 Directory of Municipal Officials and Frontline Office Heads\n")
            
        lines = p["outside_text_lines"] if p["outside_text_lines"] else p["fallback_text_lines"]
        
        if lines:
            for l in lines:
                if re.match(r'^\d+\.\s+[A-Z]', l) or (re.match(r'^[A-Z\s]{4,}$', l) and len(l) > 6 and not l.startswith('ABOUT THE SERVICE')):
                    if any(kw in l for kw in ['OFFICE', 'SERVICES', 'SECTION', 'PROGRAM']):
                        md_output.append(f"\n### {l}\n")
                    else:
                        md_output.append(f"\n#### {l}\n")
                elif l.startswith('ABOUT THE SERVICE:'):
                    desc = l.replace('ABOUT THE SERVICE:', '').strip()
                    md_output.append(f"\n**About the Service:** {desc}\n")
                else:
                    md_output.append(l)
            md_output.append("")
            
        for t in p["tables"]:
            table_md = format_markdown_table(t)
            if table_md:
                md_output.append(table_md)
                md_output.append("")
                
        md_output.append(f"<!-- End of Page {p_num} -->\n")
        
    full_md = "\n".join(md_output)
    with open(MD_OUT, "w", encoding="utf-8") as f:
        f.write(full_md)
    print(f"[OK] Markdown saved to {MD_OUT} ({len(full_md.encode('utf-8')) / 1024:.1f} KB)")
    
    # -------------------------------------------------------------
    # 2. GENERATE STRUCTURED JSON
    # -------------------------------------------------------------
    # Parse services structured list
    parsed_services = []
    current_service = None
    
    for p in pages_data:
        p_num = p["page"]
        lines = p["outside_text_lines"] if p["outside_text_lines"] else p["fallback_text_lines"]
        
        # Check for service header in outside lines
        for l in lines:
            m = re.match(r'^(\d+)\.\s+(.*)', l)
            if m and p_num >= 10 and p_num < 242:
                s_num = int(m.group(1))
                s_title = m.group(2).strip()
                if current_service:
                    parsed_services.append(current_service)
                current_service = {
                    "service_number": s_num,
                    "service_name": s_title,
                    "page_start": p_num,
                    "about": "",
                    "office": "",
                    "classification": "",
                    "transaction_type": "",
                    "who_may_avail": "",
                    "checklist_of_requirements": [],
                    "procedures": [],
                    "total_fees": "",
                    "total_processing_time": ""
                }
            elif current_service and l.startswith('ABOUT THE SERVICE:'):
                current_service["about"] = l.replace('ABOUT THE SERVICE:', '').strip()
                
        # Parse table contents for current_service
        for t in p["tables"]:
            if not current_service:
                continue
            for row in t:
                # Check for metadata rows
                row_str = " ".join(row).lower()
                if "office or division" in row_str:
                    for idx, cell in enumerate(row):
                        if "office or division" in cell.lower() and idx + 1 < len(row):
                            val = [c for c in row[idx+1:] if c]
                            if val:
                                current_service["office"] = val[0]
                                break
                if "classification" in row_str and not current_service["classification"]:
                    for idx, cell in enumerate(row):
                        if "classification" in cell.lower() and idx + 1 < len(row):
                            val = [c for c in row[idx+1:] if c]
                            if val:
                                current_service["classification"] = val[0]
                                break
                if "type of transaction" in row_str and not current_service["transaction_type"]:
                    for idx, cell in enumerate(row):
                        if "type of transaction" in cell.lower() and idx + 1 < len(row):
                            val = [c for c in row[idx+1:] if c]
                            if val:
                                current_service["transaction_type"] = val[0]
                                break
                if "who may avail" in row_str and not current_service["who_may_avail"]:
                    for idx, cell in enumerate(row):
                        if "who may avail" in cell.lower() and idx + 1 < len(row):
                            val = [c for c in row[idx+1:] if c]
                            if val:
                                current_service["who_may_avail"] = val[0]
                                break
                # Check for procedure rows (5 columns: client step, agency action, fees, time, person)
                if len(row) >= 4 and any(step_kw in row_str for step_kw in ['minute', 'hour', 'day', 'none', 'php', 'total']):
                    if "client steps" in row_str or "checklist of requirements" in row_str:
                        continue
                    if "total:" in row_str or "total" in row_str:
                        # Capture totals
                        for c in row:
                            if any(curr in c.upper() for curr in ['PHP', 'P ', '₱']):
                                current_service["total_fees"] = c
                            elif any(tm in c.lower() for tm in ['minute', 'hour', 'day']):
                                current_service["total_processing_time"] = c
                    else:
                        current_service["procedures"].append({
                            "client_step": row[0] if len(row) > 0 else "",
                            "agency_action": row[1] if len(row) > 1 else "",
                            "fees": row[2] if len(row) > 2 else "",
                            "processing_time": row[3] if len(row) > 3 else "",
                            "person_responsible": row[4] if len(row) > 4 else ""
                        })
                # Check for requirements rows (has requirement and where to secure)
                elif len(row) >= 2 and not any(meta_kw in row_str for meta_kw in ['office or division', 'classification', 'type of transaction', 'who may avail', 'client steps']):
                    req_item = row[0].strip()
                    where_sec = row[-1].strip() if len(row) > 1 else ""
                    if req_item and req_item != where_sec and len(req_item) > 3:
                        current_service["checklist_of_requirements"].append({
                            "requirement": req_item,
                            "where_to_secure": where_sec
                        })
                        
    if current_service:
        parsed_services.append(current_service)
        
    json_data = {
        "metadata": {
            "document_title": "Citizen's Charter",
            "municipality": "Municipality of Morong",
            "province": "Rizal",
            "region": "Region IV-A (CALABARZON)",
            "country": "Philippines",
            "edition": "2025 Edition",
            "legal_basis": [
                "Republic Act No. 9485 (Anti-Red Tape Act of 2007)",
                "Republic Act No. 11032 (Ease of Doing Business and Efficient Government Service Delivery Act of 2018)"
            ],
            "total_pages": total_pages,
            "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "services_count": len(parsed_services)
        },
        "vision": "By 2030, MORONG is a premier center of Eastern Rizal for health and education, where a God-loving, resilient and empowered citizenry lives in a peaceful, ecologically balanced and culturally nurtured community with a vibrant economy under a responsive and committed governance.",
        "mission": "To be of service to the people regardless of age, nationality, religion and political affiliation and sex in a timely manner.",
        "mandate": "To serve people promptly and efficiently with utmost courtesy and integrity.",
        "goals_and_objectives": [
            "Increase employment opportunities through environmentally sound industrial and commercial growth",
            "Provide an adequate supply of affordable housing",
            "Provide broader opportunities and increase particularly by the marginalized sector, to educational, health care, welfare and protective services and facilities",
            "Increase agricultural productivity by the marginalized sector, to educational, health care, welfare and protective services and facilities",
            "Improve the efficiency of the local government to respond to the needs of the population",
            "Promote the full participation of the citizens in the local development efforts"
        ],
        "service_pledge": [
            "To value citizenry with quality service",
            "To value every citizen complaint, comments and suggestions",
            "To provide basic services expected of a good government"
        ],
        "feedback_and_redress": {
            "feedback_mechanisms": [
                "Accomplish our Feedback Form available at the Public Assistance and Complaints Desk (PACD)",
                "Send feedback via email or text at 09560992259",
                "Talk directly to our Officer of the Day"
            ],
            "complaint_procedure": [
                "File a written complaint with our Officer of the Day at the Public Assistance and Complaints Desk",
                "The complaint is immediately forwarded to the concerned Department Head",
                "Written explanation and resolution must be provided within the prescribed ARTA turnaround period"
            ],
            "oversight_contacts": {
                "arta": {
                    "agency": "Anti-Red Tape Authority (ARTA)",
                    "email": "complaints@arta.gov.ph",
                    "phone": "8478 5093"
                },
                "pcc": {
                    "agency": "Presidential Complaint Center (PCC)",
                    "hotline": "8888"
                },
                "ccb": {
                    "agency": "Contact Center ng Bayan (CCB)",
                    "sms": "0908 881 6565",
                    "phone": "16565"
                }
            }
        },
        "directory_of_officials": [
            {"office": "Municipal Treasurer's Office", "head": "Ms. Maria Teresa Garrovillas", "designation": "Municipal Treasurer"},
            {"office": "Business Permits and Licensing Office (BPLO)", "head": "Engr. Bayani Sunga", "designation": "BPLO Head"},
            {"office": "Municipal Assessor's Office", "head": "Ms. Emiline Garrovillas", "designation": "Municipal Assessor"},
            {"office": "Municipal Agricultural Office", "head": "Ms. Arlene T. Esmama", "designation": "Municipal Agriculturist"},
            {"office": "Municipal Social Welfare and Development Office (MSWDO)", "head": "Ms. Joahnna Mauline L. Santiago", "designation": "MSWD Officer"},
            {"office": "Municipal Civil Registrar's Office", "head": "Ms. Catherine Valiente", "designation": "Municipal Civil Registrar"},
            {"office": "Municipal Planning and Development Coordinator's Office (MPDC)", "head": "Ms. Maribeth C. Felix", "designation": "MPDC Head"},
            {"office": "Municipal Health Office (MHO)", "head": "Dr. Ana Karina M. Mariano, MD", "designation": "Municipal Health Officer"},
            {"office": "Municipal Engineering Office", "head": "Engr. Bayani Sunga", "designation": "Municipal Engineer"},
            {"office": "Municipal Tourism Office", "head": "Ms. Shieldeen B. Soriano", "designation": "Municipal Tourism Officer"},
            {"office": "Municipal Budget Office", "head": "Ms. Leni Pascual", "designation": "Municipal Budget Officer"},
            {"office": "General Services Office (GSO)", "head": "Mr. David Emmanuel SE. Soriano", "designation": "GSO Head"},
            {"office": "Human Resource Management Office (HRMO)", "head": "Mr. Teodoro S. Trinidad", "designation": "HRMO Head"},
            {"office": "Municipal Disaster Risk Reduction and Management Office (MDRRMO)", "head": "Mr. Jerome L. Mateo", "designation": "MDRRM Officer"},
            {"office": "Office of the Secretary to the Sangguniang Bayan", "head": "Mr. Bernadette E. Valiente", "designation": "Secretary to the Sanggunian"},
            {"office": "Office of the Municipal Environment and Natural Resources (MENRO)", "head": "Engr. Gem James R. Castillon", "designation": "MENR Officer"}
        ],
        "services": parsed_services,
        "pages": pages_data
    }
    
    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)
        
    print(f"[OK] JSON saved to {JSON_OUT} ({len(json.dumps(json_data).encode('utf-8')) / 1024:.1f} KB)")
    print(f"[OK] Extracted {len(parsed_services)} structured services.")
    print("Done! Both files generated successfully.")

if __name__ == "__main__":
    main()
