import pandas as pd
from pathlib import Path

def build_space_a_context():
    file_path = Path(__file__).resolve().parent.parent / "data" / "space_a_FINAL.xlsx"

    df = pd.read_excel(file_path)

    lines = []

    for index, row in df.iterrows():
        lines.append("===================================")

        for col in df.columns:
            value = str(row[col]).strip()

            if value != "nan":
                lines.append(f"[{col}] {value}")

        lines.append("")

    output_text = "\n".join(lines)

    output_path = Path(__file__).resolve().parent.parent / "data" / "space_a_context.txt"

    output_path.write_text(output_text, encoding="utf-8")

    print("SPACE A context 建立完成")

build_space_a_context()