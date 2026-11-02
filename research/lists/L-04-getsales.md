# L-04 Research list: S-D3 GetSales outbound demo
Status: draft
Approved by: (not yet)
Level: child (`research\getsales\`)
Readers: S-D3 (also reads L-02 R3, the scraped-data output contract)
Drawn from: D3 ("10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. Pipeline: Sales Navigator, then CSV export, then enrichment from D2, then a computed first-message variable, then import into GetSales. Live run: the six stakeholders from D2 go through the operator's own sender profile. The output is a video clipped from the rig recordings"), and the charter's open questions on D3. S-D3's own problem, scope and DoD aren't written yet and the project DoD doesn't exist, so each item cites the charter line it serves instead of a DoD id.

Rules for every item: screen care. The GetSales probe reads guides and tool descriptions only. It never lists Alex's flows, leads, contacts or inbox, because his own outbound stays off screen. No writes of any kind.

- [ ] R1 GetSales mechanics (live probe, read-only). What can GetSales do for this pipeline: flows, CSV import with custom fields, custom variables in message templates, and sending different leads to different flows? What are the limits: per-sender daily caps, LinkedIn safety limits, how an import maps columns to variables? · serves: D3 "routes each lead to the right automation", "import into GetSales" · tools: GetSales MCP `get_guide` and tool listings only, GetSales public docs · deep: no
- [ ] R2 Sales Navigator to CSV. What are the current ways to get a Sales Navigator search into a CSV (export tools, GetSales' own LinkedIn import), what does each cost, and what does each risk for the LinkedIn account? Which fits a demo on the operator's own account? · serves: D3 "Sales Navigator, then CSV export" · tools: WebSearch, web-fetch · deep: no
- [ ] R3 Ten ICPs and a classifier. What's the converged way to classify leads into ICPs and route each to its own sequence: rules on firmographics, an LLM classifier on enriched fields, or GetSales' own branching? How do practitioners structure ten ICPs with a drip sequence each so it doesn't read as one template with names swapped? · serves: D3 "10 ICPs with a drip sequence each, and a classifier" · tools: WebSearch, web-fetch · deep: no
- [ ] R4 The computed first message. What does good LLM-computed personalisation in a first LinkedIn message look like in 2026 (signal-based openers, one researched line), what evidence is there on reply rates, and what reads as AI-written? · serves: D3 "a computed first-message variable" · tools: WebSearch, web-fetch · deep: no
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for S-D3's methodology
- [ ] DIRECTORY.md entries for every report above
