from pathlib import Path
import re
root = Path(r'C:\Users\KING\OneDrive\Pictures\Desktop\Investra Project')
removed = []
for sub in ['frontend/src', 'dashboards/src']:
    dirpath = root / sub
    for path in dirpath.rglob('*.js'):
        text = path.read_text(encoding='utf-8')
        match = re.search(r"^import\s+React(?:\s*,\s*\{([^}]*)\})?\s*from\s+['\"]react['\"];?\s*$", text, re.M)
        if not match:
            continue
        rest = text[: match.start()] + text[match.end():]
        if re.search(r"\bReact\b", rest):
            continue
        imports = match.group(1)
        if imports:
            new_line = f"import {{ {imports.strip()} }} from 'react';\n"
            new_text = text[: match.start()] + new_line + rest
        else:
            new_text = rest
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
            removed.append(str(path))
print('removed unused React import from', len(removed), 'files')
for p in removed:
    print(p)
