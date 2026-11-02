import re, sys, urllib.request, urllib.error
sys.stdout.reconfigure(encoding="utf-8")
B = "http://localhost:3101"

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None

op = urllib.request.build_opener(NoRedirect)

def get(path):
    try:
        r = op.open(B + path, timeout=240)
        return r.status, r.read().decode("utf-8", "replace"), None
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace") if e.code < 300 or e.code >= 400 else "", e.headers.get("Location")

def text(h, pat):
    return [re.sub(r"<[^>]+>", "", m).strip() for m in re.findall(pat, h, re.S)]

s, h, _ = get("/")
print("home", s, "| h1:", text(h, r"<h1[^>]*>(.*?)</h1>"), "| countdown/begins:", "Begins" in h, "| start-here:", "start-here" in h,
      "| status board:", "status-inline" in h or 'id="post-status"' in h, "| carousel:", 'class="sc rc' in h, "| feed:", 'id="feed"' in h)
nav = re.search(r'<nav class="nav-links"[^>]*>(.*?)</nav>', h, re.S)
print("  menu:", text(nav.group(1), r'class="nav-link"[^>]*>(.*?)</a>') if nav else None, "| CTA:", "Watch the explainer" in h)
foot = re.search(r"<footer.*?</footer>", h, re.S).group(0)
print("  footer links:", text(foot, r'class="footer-link[^"]*"[^>]*>(.*?)</a>'), "| demo columns:", "footer-num" in foot)
s, h, _ = get("/log")
print("log", s, "| h1:", text(h, r"<h1[^>]*>(.*?)</h1>"), "| status board:", "status-inline" in h or 'id="post-status"' in h, "| posts:", len(re.findall(r'id="post-', h)))
for d in ("d1", "d2"):
    s, h, _ = get("/" + d)
    print(d, s, "| crumb:", text(h, r'entry-crumb[^>]*>(.*?)</nav>'), "| Demo N:", bool(re.search(r">\s*Demo \d", h)), "| At a glance:", "At a glance" in h,
          "| other-demos band:", 'aria-label="Other demos"' in h, "| eyebrow:", text(h, r'art-eyebrow is-lavender">(.*?)</p>')[:1])
for d in ("d3", "d4", "d7", "d9", "d12"):
    s, _, loc = get("/" + d)
    print(d, s, "->", loc)
s, h, _ = get("/demos")
print("demos index", s, "| sample entries:", "sample" in h.lower() and "sample-video-entry" in h, "| entries:", sorted(set(re.findall(r'href="(/demos/[^"#?]+)"', h))))
