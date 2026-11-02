"""Builds research/portfolio/preview.html from research/portfolio/ai-portfolio.md."""
import json, re
SRC = r"C:\Users\alder\Desktop\Hire me hackaton\research\portfolio\ai-portfolio.md"
OUT = r"C:\Users\alder\Desktop\Hire me hackaton\research\portfolio\preview.html"

text = open(SRC, encoding="utf-8").read()
m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
fm, body = m.group(1), m.group(2)

def field(name):
    mm = re.search(r'^\s*' + name + r':\s*"?(.*?)"?\s*$', fm, re.M)
    return mm.group(1) if mm else ""

meta = {k: field(k) for k in ("title", "description", "author", "date", "kicker", "subtitle", "reading_minutes")}

page = """<title>AI Portfolio Draft</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@300;400;500;600&display=swap">
<style>
/* Layout: one reading column in the site's Addvery editorial layer; a review panel for Alex above the entry. */
:root {
  --bg: #ffffff; --fg: #151515; --muted: #5e6873; --accent: #8b3fcf; --accent-2: #6645eb;
  --line: #e3dfea; --panel: #f5f2fa; --note-bg: #fff4c2; --note-fg: #4a3b00; --card: #faf8fd;
  --display: "Inter Tight", "Helvetica Neue", Arial, sans-serif;
  --body: "Outfit", "Segoe UI", system-ui, sans-serif;
  --mono: ui-monospace, "Cascadia Code", Consolas, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #151515; --fg: #f2f0f5; --muted: #bcbcbc; --accent: #d3c3ff; --accent-2: #b39cff;
  --line: #333038; --panel: #1f1c24; --note-bg: #3a3214; --note-fg: #ffe7a3; --card: #1b1920; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #151515; --fg: #f2f0f5; --muted: #bcbcbc; --accent: #d3c3ff; --accent-2: #b39cff;
  --line: #333038; --panel: #1f1c24; --note-bg: #3a3214; --note-fg: #ffe7a3; --card: #1b1920; color-scheme: dark }
body { background: var(--bg); color: var(--fg); font-family: var(--body); font-size: 18px; line-height: 1.65;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 32px 64px; }
.wrap { max-width: 44rem; margin: 0 auto; display: grid; gap: 28px; }
.review { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; font-size: 15px; line-height: 1.55; }
.review h2 { font-family: var(--display); font-size: 15px; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); margin: 0 0 8px; }
.review p { margin: 0 0 8px; } .review ul { margin: 0; padding-left: 20px; } .review li { margin: 4px 0; }
header.entry { display: grid; gap: 10px; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
.kicker { font-family: var(--display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
h1 { font-family: var(--display); font-weight: 600; font-size: clamp(30px, 6vw, 44px); line-height: 1.12; margin: 0; text-wrap: balance; }
.subtitle { font-size: 20px; color: var(--muted); margin: 0; font-weight: 300; }
.byline { font-size: 14px; color: var(--muted); font-variant-numeric: tabular-nums; }
article h2 { font-family: var(--display); font-weight: 600; font-size: 26px; line-height: 1.25; margin: 44px 0 10px; text-wrap: balance; }
article h3 { font-family: var(--display); font-weight: 600; font-size: 20px; margin: 32px 0 8px; }
article p { margin: 0 0 18px; } article ul, article ol { padding-left: 22px; margin: 0 0 18px; }
article a { color: var(--accent); text-underline-offset: 3px; }
article a:focus-visible { outline: 2px solid var(--accent-2); outline-offset: 2px; }
article code { font-family: var(--mono); font-size: .88em; background: var(--panel); padding: 1px 5px; border-radius: 4px; }
.pull { margin: 28px 0; padding: 4px 0 4px 22px; border-left: 3px solid var(--accent); }
.pull p { font-size: 21px; line-height: 1.5; margin: 0 0 8px; font-weight: 400; }
.pull .who { font-size: 14px; color: var(--muted); }
.keypoints { background: var(--panel); border-radius: 10px; padding: 16px 20px; margin: 24px 0; }
.keypoints .label, .flow .label { font-family: var(--display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
.keypoints ul { margin: 0; }
.proof { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; font-size: 15.5px; line-height: 1.5; margin: -6px 0 22px; }
.proof strong:first-child { font-family: var(--display); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-right: 6px; }
.flow { margin: 28px 0; } .flow-caption { font-size: 14px; color: var(--muted); margin-bottom: 12px; }
.flow ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; counter-reset: s; }
.flow li { counter-increment: s; display: grid; grid-template-columns: 2.2rem 1fr; gap: 10px; align-items: start; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; font-size: 15.5px; line-height: 1.45; }
.flow li::before { content: counter(s); font-family: var(--display); font-weight: 600; color: var(--accent); font-size: 18px; }
.flow li b { display: block; font-family: var(--display); font-weight: 600; font-size: 16px; }
.alex-note { background: var(--note-bg); color: var(--note-fg); border-radius: 4px; padding: 1px 5px; font-size: .9em; }
hr { border: 0; border-top: 1px solid var(--line); margin: 36px 0; }
@media (max-width: 480px) { body { font-size: 17px; } .pull p { font-size: 19px; } }
</style>
<div class="wrap">
  <section class="review" aria-label="For Alex">
    <h2>For Alex: draft for your last-mile edit</h2>
    <p>Your AI portfolio entry, as it will read on the site (placed at <code>/demos/ai-portfolio</code>, linked from About me). Comment on this page to sign it off or to ask for changes. Yellow marks are the five points only you can settle.</p>
    <ul>
      <li>Some lines come from your work-samples email (the "junior and senior" line, "passion project", "looks insane", "50/50", "improved since"). The person it went to and the role are not mentioned anywhere. Fine to use these lines publicly?</li>
      <li>Two of your public repos have exposure in their history: older commits in <code>cb6-prayer-project</code> still hold a client contact's details, photo GPS data and a Drive link, and its README links editable Google Docs. <code>Factor-AI</code> holds 18 raw session transcripts with your email address and private folder names. So the entry doesn't link the CB6 repo, and links only the two Factor-AI files you already share.</li>
      <li>Open from the brand review: no closing invitation yet, no cost or return figure, and "GTM" isn't spelled out.</li>
    </ul>
  </section>
  <header class="entry">
    <div class="kicker" id="kicker"></div>
    <h1 id="title"></h1>
    <p class="subtitle" id="subtitle"></p>
    <div class="byline" id="byline"></div>
  </header>
  <article id="article"></article>
</div>
<script type="application/json" id="meta">__META__</script>
<script type="application/json" id="md">__BODY__</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js"></script>
<script>
(function () {
  var meta = JSON.parse(document.getElementById('meta').textContent);
  var md = JSON.parse(document.getElementById('md').textContent);
  document.getElementById('kicker').textContent = meta.kicker;
  document.getElementById('title').textContent = meta.title;
  document.getElementById('subtitle').textContent = meta.subtitle;
  document.getElementById('byline').textContent = meta.author + ' \\u00b7 2 Nov 2026 \\u00b7 ' + meta.reading_minutes + ' min read';
  var inline = function (s) { return marked.parseInline(s); };
  var lines = md.split('\\n'), out = [], buf = [];
  function flush() { if (buf.length) { out.push(marked.parse(buf.join('\\n'))); buf = []; } }
  for (var i = 0; i < lines.length; i++) {
    var mm = lines[i].match(/^> \\[!(\\w+)\\]\\s*(.*)$/);
    if (!mm) { buf.push(lines[i]); continue; }
    flush();
    var kind = mm[1], rest = [];
    i++;
    while (i < lines.length && /^>/.test(lines[i])) { rest.push(lines[i].replace(/^>\\s?/, '')); i++; }
    i--;
    if (kind === 'quote') {
      var who = rest.pop();
      out.push('<figure class="pull"><p>' + inline(rest.join(' ')) + '</p><figcaption class="who">' + inline(who) + '</figcaption></figure>');
    } else if (kind === 'summary') {
      out.push('<div class="keypoints"><div class="label">Key points</div>' + marked.parse(rest.join('\\n')) + '</div>');
    } else if (kind === 'diagram') {
      var cap = rest.shift();
      var items = rest.map(function (l) {
        var t = l.replace(/^\\d+\\.\\s*/, ''), p = t.indexOf(':');
        return '<li><span><b>' + inline(t.slice(0, p)) + '</b>' + inline(t.slice(p + 1).trim()) + '</span></li>';
      });
      out.push('<div class="flow"><div class="label">Diagram</div><div class="flow-caption">' + inline(cap) + '</div><ol>' + items.join('') + '</ol></div>');
    } else {
      out.push(marked.parse(rest.join('\\n')));
    }
  }
  flush();
  var html = out.join('\\n').replace(/\\[Alex:([^\\]]*)\\]/g, '<mark class="alex-note">Alex:$1</mark>');
  var art = document.getElementById('article');
  art.innerHTML = html;
  art.querySelectorAll('p').forEach(function (p) {
    var f = p.firstElementChild;
    if (f && f.tagName === 'STRONG' && /^Proof:?$/.test(f.textContent.trim()) && p.firstChild === f) p.classList.add('proof');
  });
  art.querySelectorAll('a[href^="http"]').forEach(function (a) { a.target = '_blank'; a.rel = 'noopener'; });
})();
</script>
"""

def js(obj):
    return json.dumps(obj, ensure_ascii=False).replace("</", "<\\/")

page = page.replace("__META__", js(meta)).replace("__BODY__", js(body))
open(OUT, "w", encoding="utf-8").write(page)
print("wrote", OUT, len(page), "bytes")
