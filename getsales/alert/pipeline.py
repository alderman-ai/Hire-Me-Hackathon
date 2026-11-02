r"""The alert pipeline: Alex's six -> custom message 1 -> CSV and import payload -> pre-send text.

Run from getsales\ with:  python -I alert\pipeline.py <command>

  render         live\six.json -> live\alert.csv, live\enroll-leads.json,
                 live\pre-send.md (exact text, git-ignored) and
                 live\gate-rolelabelled.md (role labels only, safe to copy into the gate).
  nodes          alert\copy.json -> alert\flow-nodes.json, the create_flow graph (no names).
  stage <text>   append "<HH:MM> Prague  <text>" to live-run.md (stage times for the clip).
  scan           check every tracked file in getsales\ for the six's names; prints counts only.

live\six.json is written by the subagent that reads Alex's research. One object per person:
  {"role": "CEO", "first_name": "...", "last_name": "...", "linkedin_url": "https://www.linkedin.com/in/...",
   "company": "Addvery", "position": "...", "opener": "one personal line", "opener_basis": "what it rests on"}

Nothing here prints a name or a personal line to stdout: the session's output is recorded.
"""
import csv
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent  # getsales\
LIVE = HERE / "live"
COPY = HERE / "alert" / "copy.json"
# This machine runs on Prague time (Central Europe Standard Time); Windows Python has no tzdata.
MAX_OPENER = 280
MAX_NOTE = 200


def load_copy():
    c = json.loads(COPY.read_text(encoding="utf-8"))
    s = c["settings"]

    def fill(t):
        return t.replace("{SITE_URL}", s["site_url"]).replace("{PRIVACY_URL}", s["privacy_url"])

    note = c["note_with_link"] if s["link_in_note"] else c["note_without_link"]
    return c, s, {
        "note": fill(note),
        "alert_block": fill(c["alert_block"]),
        "privacy_line": fill(c["privacy_line"]),
        "msg2": fill(c["msg2_why"]),
        "msg3": fill(c["msg3_close"]),
    }


def custom_message_1(person, t, s):
    parts = [person["opener"].strip(), t["alert_block"]]
    if s["privacy_line_in_message_1"]:
        parts.append(t["privacy_line"])
    return "\n\n".join(parts)


def render_liquid(text, first_name, cm1=""):
    # The only variables the alert uses. GetSales renders the same two with its Liquid engine.
    out = re.sub(r"\{\{\s*first_name\s*\}\}", first_name, text)
    out = re.sub(r"\{\{\s*custom_message_1\s*\}\}", cm1, out)
    if "{{" in out or "{%" in out:
        raise SystemExit("ERROR: an unrendered variable is left in the copy")
    return out


def check_six(six):
    problems = []
    if len(six) != 6:
        problems.append(f"expected 6 people, got {len(six)}")
    for i, p in enumerate(six, 1):
        for k in ("role", "first_name", "last_name", "linkedin_url", "opener"):
            if not str(p.get(k, "")).strip():
                problems.append(f"row {i}: missing {k}")
        if p.get("linkedin_url") and "linkedin.com/" not in p["linkedin_url"]:
            problems.append(f"row {i}: linkedin_url is not a LinkedIn profile URL")
        if len(p.get("opener", "")) > MAX_OPENER:
            problems.append(f"row {i}: opener is {len(p['opener'])} chars (max {MAX_OPENER})")
        if re.search(r"[{}]", p.get("opener", "")):
            problems.append(f"row {i}: opener contains a brace, which Liquid would choke on")
    return problems


def cmd_render():
    c, s, t = load_copy()
    if "SET_AT_GATE" in (s["site_url"] + s["privacy_url"]):
        print("WARN site_url or privacy_url still SET_AT_GATE: rendering with placeholders")
    six = json.loads((LIVE / "six.json").read_text(encoding="utf-8"))
    problems = check_six(six)
    if problems:
        print("ERROR six.json:\n  " + "\n  ".join(problems))
        return 1

    rows, leads, full, labelled = [], [], [], []
    for p in six:
        cm1 = custom_message_1(p, t, s)
        note = render_liquid(t["note"], p["first_name"])
        if len(note) > MAX_NOTE:
            print(f"ERROR the note renders to {len(note)} chars for one person (max {MAX_NOTE})")
            return 1
        msgs = [render_liquid("{{custom_message_1}}", p["first_name"], cm1),
                render_liquid(t["msg2"], p["first_name"]), render_liquid(t["msg3"], p["first_name"])]
        rows.append({"linkedin_id": p["linkedin_url"], "first_name": p["first_name"], "last_name": p["last_name"],
                     "company_name": p.get("company", "Addvery"), "position": p.get("position", ""),
                     "custom_message_1": cm1, "role_label": p["role"]})
        leads.append({"linkedin_id": p["linkedin_url"], "first_name": p["first_name"], "last_name": p["last_name"],
                      "company_name": p.get("company", "Addvery"), "position": p.get("position", ""),
                      "custom_fields": {"custom_message_1": cm1}})
        full.append(f"## {p['role']}: {p['first_name']} {p['last_name']}\n\n"
                    f"Profile: {p['linkedin_url']}\n\nOpening line rests on: {p.get('opener_basis', '')}\n\n"
                    f"**If not connected, connection note ({len(note)} chars):**\n\n> {note}\n\n"
                    f"**Message 1, `custom message 1` (on acceptance, or at once if already connected):**\n\n"
                    + "\n".join("> " + ln for ln in msgs[0].split("\n"))
                    + f"\n\n**Message 2 (a day later):**\n\n> {msgs[1]}\n\n**Message 3 (three days after that):**\n\n> {msgs[2]}\n")
        role_note = render_liquid(t["note"], f"[{p['role']}'s first name]")
        role_cm1 = "\n\n".join([f"[{p['role']}'s personal opening line, {len(p['opener'])} characters]"] + cm1.split("\n\n")[1:])
        labelled.append(f"### {p['role']}\n\n- Connection note: \"{role_note}\"\n- Message 1:\n\n"
                        + "\n".join("  > " + ln for ln in role_cm1.split("\n")) + "\n")

    LIVE.mkdir(exist_ok=True)
    with (LIVE / "alert.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    (LIVE / "enroll-leads.json").write_text(json.dumps(leads, ensure_ascii=False, indent=2), encoding="utf-8")
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    (LIVE / "pre-send.md").write_text(
        f"# The six alert messages, exact text\n\nRendered {now} Prague from `alert/copy.json` and `live/six.json`. "
        "This is what the approval covers, word for word. It must not change while the approval is open.\n\n"
        + "\n".join(full), encoding="utf-8")
    (LIVE / "gate-rolelabelled.md").write_text("\n".join(labelled), encoding="utf-8")
    print(f"OK rendered {len(rows)} people: live/alert.csv, live/enroll-leads.json, live/pre-send.md, live/gate-rolelabelled.md")
    return 0


def node(id_, type_, after, payload, delay=0):
    return {"id": id_, "before": [], "after": [{"node_id": n, "branch_id": b} for n, b in after],
            "type": type_, "automation": "auto", "payload": payload, "delay_in_seconds": delay}


def msg(id_, template, nxt, delay):
    return node(id_, "linkedin_send_message", [(nxt, 1)],
                {"template": template, "attachments": [], "template_uuid": None, "stop_on_reply_level": "always"}, delay)


def cmd_nodes():
    c, s, t = load_copy()
    d = c["delays_seconds"]
    half = d["wait_for_acceptance_total"] // 2
    nodes = [
        node(1, "end", [], []),
        # Pre-check: branch 2 = already connected -> message 1 at once; branch 1 = not connected -> connect.
        node(2, "trigger_linkedin_connection_request_accepted", [(3, 1), (20, 2)],
             {"subtasks": [{"id": 30, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": 60},
                            "automation": "auto", "delay_in_seconds": 0}]}),
        node(3, "linkedin_send_connection_request", [(4, 1)],
             {"template": c["note_with_link" if s["link_in_note"] else "note_without_link"]
                 .replace("{SITE_URL}", s["site_url"]), "fallback_send": True, "template_uuid": None}),
        # Wait up to 10 days for acceptance, no automatic like: branch 2 = accepted, branch 1 = timeout.
        node(4, "trigger_linkedin_connection_request_accepted", [(5, 1), (6, 2)],
             {"subtasks": [{"id": 31, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": half},
                            "automation": "auto", "delay_in_seconds": 0},
                           {"id": 32, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": half},
                            "automation": "auto", "delay_in_seconds": 0}]}),
        node(5, "linkedin_withdraw_connection_request", [(1, 1)], []),
        msg(6, "{{custom_message_1}}", 7, d["msg1_after_acceptance"]),
        msg(7, t["msg2"], 8, d["msg2"]),
        msg(8, t["msg3"], 1, d["msg3"]),
        msg(20, "{{custom_message_1}}", 21, d["msg1_if_already_connected"]),
        msg(21, t["msg2"], 22, d["msg2"]),
        msg(22, t["msg3"], 1, d["msg3"]),
    ]
    by_id = {n["id"]: n for n in nodes}
    for n in nodes:
        for a in n["after"]:
            by_id[a["node_id"]]["before"].append({"node_id": n["id"], "branch_id": a["branch_id"]})
    out = {"first_common_node_id": 2, "nodes": nodes}
    (HERE / "alert" / "flow-nodes.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK alert/flow-nodes.json: {len(nodes)} nodes, entry 2")
    return 0


def cmd_stage(text):
    f = HERE / "live-run.md"
    if not f.exists():
        f.write_text("# Alert live run: stage times\n\nWall-clock Prague time of each stage of the alert, for the clip. "
                     "No names: the six appear only as \"the six\".\n\n| Time (Prague) | Stage |\n| --- | --- |\n",
                     encoding="utf-8")
    now = datetime.now().strftime("%H:%M:%S")
    with f.open("a", encoding="utf-8") as fh:
        fh.write(f"| {now} | {text} |\n")
    print(f"OK {now} {text}")
    return 0


def cmd_scan():
    six = json.loads((LIVE / "six.json").read_text(encoding="utf-8"))
    needles = set()
    for p in six:
        for k in ("first_name", "last_name"):
            v = str(p.get(k, "")).strip()
            if len(v) >= 3:
                needles.add(v.lower())
        slug = re.sub(r".*linkedin\.com/in/", "", p.get("linkedin_url", "")).strip("/").lower()
        if len(slug) >= 3:
            needles.add(slug)
    tracked = subprocess.run(["git", "ls-files", "--", "."], cwd=HERE, capture_output=True, text=True).stdout.split()
    hits = 0
    for rel in tracked:
        try:
            body = (HERE / rel).read_text(encoding="utf-8", errors="replace").lower()
        except OSError:
            continue
        n = sum(1 for x in needles if re.search(r"\b" + re.escape(x) + r"\b", body))
        if n:
            hits += 1
            print(f"HIT {rel}: {n} of the six's names or slugs")
    print(f"SCAN {len(tracked)} tracked files, {hits} with hits")
    return 1 if hits else 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(2)
    sys.exit({"render": lambda: cmd_render(), "nodes": lambda: cmd_nodes(),
              "stage": lambda: cmd_stage(" ".join(a[1:])), "scan": lambda: cmd_scan()}[a[0]]())
