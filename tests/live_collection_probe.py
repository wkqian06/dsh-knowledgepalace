"""Opt-in smoke check using isolated temporary roots and live OpenAlex."""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp)
    for name in ('vault', 'state', 'source', 'workspace'):
        (root / name).mkdir()
    for name in ('concepts.md', 'domains.md'):
        (root / 'vault' / name).write_text('', encoding='utf-8')
    config = root / 'config.toml'
    config.write_text(''.join(f'{name}_dir = "{root / name}"\n' for name in ('vault', 'state', 'source', 'workspace')), encoding='utf-8')
    process = subprocess.run([sys.executable, '-m', 'knowledge_palace.expansion.collect', '--config=' + str(config), 'search', '--limit=2', '--live', '--', 'severe convective storm'], capture_output=True, text=True, encoding='utf-8')
    if process.returncode:
        raise RuntimeError(process.stderr)
    result = json.loads(process.stdout)
    print('results:', len(result['results']), 'warnings:', result['warnings'])
    if not result['results']:
        raise RuntimeError('no live candidates returned')
