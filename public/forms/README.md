# Official Downloadable Blank Forms (`public/forms/`)

This directory is the static repository for official blank municipal application forms, engineering permits, and administrative templates for the Municipality of Morong, Rizal.

---

## How to Add Blank Forms

1. **Place the blank form PDF into this directory**:
   - Standard naming: lowercase kebab-case (e.g., `building-permit-application.pdf`, `working-permit-application.pdf`).
   - Files stored here are served statically by Vite at `/forms/{filename}`.

2. **Attach the form to any citizen service guide** (`content/services/**/*.md`):
   Declare the form in the YAML frontmatter at the very top of the markdown document:

   ```markdown
   ---
   forms:
     - title: "Mayor's Working Permit Application Form"
       url: '/forms/working-permit-application.pdf'
       fileType: 'PDF'
   ---

   # Get a Cedula and Individual Working Permit — Morong, Rizal

   ...
   ```

3. **External Official Links**:
   You can also link directly to official PDFs hosted on municipal portals (`https://morongrizal.gov.ph/...`):

   ```markdown
   ---
   forms:
     - title: 'ARTA Unified Business Permit Application Form'
       url: 'https://morongrizal.gov.ph/wp-content/uploads/2017/10/MORONG-Business-Permit-Form-ARTA.pdf'
       fileType: 'PDF'
   ---
   ```

4. **Automatic UI Card**:
   Whenever a guide declares `forms` in its frontmatter, `Document.tsx` automatically renders a prominent "Official Downloadable Blank Forms & Templates" card at the top of the guide.
