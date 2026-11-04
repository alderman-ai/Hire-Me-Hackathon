"""Summarises the leak scan (../blog-pipeline/scripts/scan.py output saved to a file): every SECRET or CONTACT hit
by page, and whether it sits on a URL line. The expected set: LinkedIn post URLs on /about, the Addvery PDF
links and the public info@addvery.com on /d2, the two Ask-your-AI prompt links on each article.
Usage: python -I scripts/check/scan_sum.py <scan output file>"""
import sys, re, collections
c = collections.Counter(); other = []
for l in open(sys.argv[1], encoding="utf-8", errors="replace"):
    m = re.match(r"(SECRET|CONTACT) (.+?):(\d+): (.*)", l.strip())
    if not m: continue
    kind, path, n, what = m.groups()
    line = open(path, encoding="utf-8", errors="replace").read().splitlines()[int(n) - 1]
    url = "http" in line
    name = re.split(r"[\/]", path)[-1]
    c[(kind, name, "url" if url else "NON-URL")] += 1
    if not url: other.append(f"{kind} {name}:{n} {what[:60]} | {line[:40]}...")
for k, v in sorted(c.items()): print(v, k)
print("--- non-url lines:", len(other))
for o in other[:20]: print(o)
