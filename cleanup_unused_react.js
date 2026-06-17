const { promises: fs } = require('fs');
const path = require('path');
const root = path.join('C:', 'Users', 'KING', 'OneDrive', 'Pictures', 'Desktop', 'Investra Project');
const subs = ['frontend/src', 'dashboards/src'];
const re = /^import\s+React(?:\s*,\s*\{([^}]*)\})?\s*from\s+['\"]react['\"];?\s*$/m;
(async () => {
  const removed = [];
  for (const sub of subs) {
    const dir = path.join(root, sub);
    const files = [];
    const walk = async (currentDir) => {
      for (const entry of await fs.readdir(currentDir, { withFileTypes: true })) {
        const p = path.join(currentDir, entry.name);
        if (entry.isDirectory()) await walk(p);
        else if (p.endsWith('.js')) files.push(p);
      }
    };
    await walk(dir);
    for (const file of files) {
      const text = await fs.readFile(file, 'utf8');
      const match = re.exec(text);
      if (!match) continue;
      const rest = text.slice(0, match.index) + text.slice(match.index + match[0].length);
      if (/\bReact\b/.test(rest)) continue;
      let newText;
      if (match[1]) {
        newText = text.slice(0, match.index) + `import { ${match[1].trim()} } from 'react';\n` + rest;
      } else {
        newText = rest;
      }
      if (newText !== text) {
        await fs.writeFile(file, newText, 'utf8');
        removed.push(file);
      }
    }
  }
  console.log('removed unused React import from', removed.length, 'files');
  removed.forEach((f) => console.log(f));
})();
