r"""Build every demo workflow's GetSales graph from the per-ICP copy files.

Run from getsales\ with:  python -I icps\build_workflows.py

Reads icps\<slug>.json (one object per cell) and writes icps\workflows.json: a list of
{name, icp, language, approach, first_common_node_id, nodes} ready for create_flow.
Each graph is GetSales' "connect + 3 messages" template with the alert's two changes:
already connected -> message 1 at once; no automatic like while waiting. Message 1 is
only {{custom_message_1}}; follow-ups are the cell's fixed texts. No leads, never started.
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
SLUGS = ["retail-loyalty", "telco-cvm", "consumer-lending", "last-mile-logistics"]
DAY = 86400


def node(id_, type_, after, payload, delay=0):
    return {"id": id_, "before": [], "after": [{"node_id": n, "branch_id": b} for n, b in after],
            "type": type_, "automation": "auto", "payload": payload, "delay_in_seconds": delay}


def msg(id_, template, nxt, delay):
    return node(id_, "linkedin_send_message", [(nxt, 1)],
                {"template": template, "attachments": [], "template_uuid": None, "stop_on_reply_level": "always"}, delay)


def graph(f1, f2):
    nodes = [
        node(1, "end", [], []),
        node(2, "trigger_linkedin_connection_request_accepted", [(3, 1), (20, 2)],
             {"subtasks": [{"id": 30, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": 60},
                            "automation": "auto", "delay_in_seconds": 0}]}),
        node(3, "linkedin_send_connection_request", [(4, 1)],
             {"template": "", "fallback_send": True, "template_uuid": None}),
        node(4, "trigger_linkedin_connection_request_accepted", [(5, 1), (6, 2)],
             {"subtasks": [{"id": 31, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": 5 * DAY},
                            "automation": "auto", "delay_in_seconds": 0},
                           {"id": 32, "type": "util_timer", "after": [], "before": [], "payload": {"wait_time": 5 * DAY},
                            "automation": "auto", "delay_in_seconds": 0}]}),
        node(5, "linkedin_withdraw_connection_request", [(1, 1)], []),
        msg(6, "{{custom_message_1}}", 7, DAY),
        msg(7, f1, 8, 3 * DAY),
        msg(8, f2, 1, 3 * DAY),
        msg(20, "{{custom_message_1}}", 21, 0),
        msg(21, f1, 22, 3 * DAY),
        msg(22, f2, 1, 3 * DAY),
    ]
    by_id = {n["id"]: n for n in nodes}
    for n in nodes:
        for a in n["after"]:
            by_id[a["node_id"]]["before"].append({"node_id": n["id"], "branch_id": a["branch_id"]})
    return nodes


def main():
    out = []
    for slug in SLUGS:
        for c in json.loads((HERE / f"{slug}.json").read_text(encoding="utf-8")):
            out.append({"name": c["workflow"], "icp": c["icp"], "language": c["language"], "approach": c["approach"],
                        "first_common_node_id": 2, "nodes": graph(c["followup_1"], c["followup_2"])})
    names = [w["name"] for w in out]
    assert len(names) == len(set(names)), "duplicate workflow names"
    (HERE / "workflows.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"OK icps/workflows.json: {len(out)} workflows")


if __name__ == "__main__":
    main()
