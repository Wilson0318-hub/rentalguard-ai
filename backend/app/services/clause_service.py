import re

def split_clauses(text: str) -> list[str]:
    text = text.strip()

    text = normalize_text(text)
    
    article_alauses = split_by_article(text)

    if len(article_alauses) > 1:
        return article_alauses
    
    return split_by_sentence(text)

def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")
    text = re.sub(r"\n{2,}", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()

def split_by_article(text: str) -> list[str]:
    pattern = r"(第[一二三四五六七八九十百零〇0-9]+條)"

    parts = re.split(pattern, text)

    clauses = []

    for i in range(1, len(parts), 2):
        title = parts[i].strip()
        content = parts[i + 1].strip() if i + 1 < len(parts) else ""

        clause = title + " " + content

        if len(clause) >= 8:
            clauses.append(clause)

    return clauses

def split_by_sentence(text: str) -> list[str]:
    raw_clauses = re.split(r"[。；;\n]+", text)

    clauses = []

    for clause in raw_clauses:
        clean_clause = clause.strip()

        if len(clean_clause) >= 6:
            clauses.append(clean_clause)

    return clauses