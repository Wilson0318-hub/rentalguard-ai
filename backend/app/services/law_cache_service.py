from pathlib import Path

def load_space_a_laws():
    file_path = Path(__file__).resolve().parent.parent / "data" / "space_a_context.txt"

    return file_path.read_text(encoding="utf-8")