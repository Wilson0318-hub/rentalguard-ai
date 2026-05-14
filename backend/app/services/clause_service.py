import re


def split_clauses(text: str) -> list[str]:
    text = normalize_text(text)

    article_clauses = split_by_article(text)

    if len(article_clauses) > 1:
        return article_clauses

    return split_by_sentence(text)


def normalize_text(text: str) -> str:
    text = text.strip()
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)

    return text


def split_by_article(text: str) -> list[str]:
    pattern = r"(?m)^(第[一二三四五六七八九十百零〇0-9]+條\s*[^\n]*)"

    matches = list(re.finditer(pattern, text))

    clauses = []

    for index, match in enumerate(matches):
        start = match.start()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)

        clause = text[start:end].strip()

        if len(clause) >= 10:
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