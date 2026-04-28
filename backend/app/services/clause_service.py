import re

def split_clauses(text: str) -> list[str]:
    text = text.strip()

    raw_clauses = re.split(r"[。；;\n]+", text)

    clauses = []

    for clause in raw_clauses:
        clean_clause = clause.strip()

        if len(clean_clause) >= 6:
            clauses.append(clean_clause)

    return clauses