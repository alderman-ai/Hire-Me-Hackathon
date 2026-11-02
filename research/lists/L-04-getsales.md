# L-04 Research list: S-D3 GetSales outbound demo
Status: with Alex (OT-03, `Operator tasks\Approve - research for the GetSales demo and website.md`)
Approved by: (not yet)
Requested by: s-d3-getsales, `RESEARCH S-D3: L-04 (R2 and R3 superseded by DI-6 A6.4: no Sales Navigator export, ICP × language × approach model; R1 and R4 still needed), plus L-01 ... needed by 16:30` (2 Nov, about 14:52)
Level: child (`research\getsales\`)
Readers: S-D3 (it also reads all of L-01, already done)
Drawn from: `getsales\SPEC.md`: (A) the alert to the six stakeholders, and (B) the ICP demo, Addvery's ICPs × the languages that make sense × 3 approaches, as workflows in one new GetSales folder, each starting with the lead field `custom message 1`, plus the routing explanation. DoD-12 (the ICP demo) and DoD-13 (the alert's pipeline and its clip), both being reworded to DI-6 A6.4.

Dropped at the requester's word, superseded by DI-6 A6.4: the old R2 (Sales Navigator to CSV; there's no export) and R3 (ten ICPs and a classifier; replaced by Alex's ICP × language × approach model). Already covered by L-01, so not repeated: GDPR and LinkedIn terms for the six (R3 there), and how an AI-written opening line is received (W3 there).

Rules for every item: screen care. The GetSales probe reads guides and tool descriptions only. It never lists Alex's flows, leads, contacts or inbox, because his own outbound stays off screen. No writes of any kind.

- [ ] R1 GetSales mechanics (live probe, read-only). What can GetSales do for this build: workflows grouped in a folder, importing leads with a custom field such as `custom message 1` and using it as the opening message, custom variables in message templates, and sending different leads to different workflows? What are the limits: per-sender daily caps, LinkedIn safety limits, how an import maps columns to fields, and what a workflow with no leads and not started looks like? · serves: DoD-12 (the ICP workflows, each starting with `custom message 1`), DoD-13 (the alert's pipeline) · tools: GetSales MCP `get_guide` and tool listings only, GetSales public docs · deep: no
- [ ] R4 The computed first message. What does good LLM-computed personalisation in a first LinkedIn message look like in 2026 (signal-based openers, one researched line), how should it differ across three approaches and across languages, what evidence is there on reply rates, and what reads as AI-written? · serves: DoD-13 (the computed first message to the six), DoD-12 (`custom message 1` in every workflow) · tools: WebSearch, web-fetch · deep: no
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for S-D3's methodology
- [ ] DIRECTORY.md entries for every report above
