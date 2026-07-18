from pathlib import Path

from PyPDF2 import PdfReader


def extract_resume_text(resume_file) -> str:
    file_extension = Path(resume_file.name).suffix.lower()

    if file_extension != ".pdf":
        return ""

    reader = PdfReader(resume_file)
    pages: list[str] = []

    for page in reader.pages:
        page_text = page.extract_text() or ""

        if page_text.strip():
            pages.append(page_text.strip())

    return "\n\n".join(pages)
