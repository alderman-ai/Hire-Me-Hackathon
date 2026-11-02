# L-02 Research list: S-D1 Scraping research demo
Status: parked (14:45). The scraping demo's session doesn't need it: Alex runs all the scraping himself in `Addvery Research\`. Open to Alex for his own work if he asks; not pushed to him, because he's swamped.
Approved by: (not yet)
Level: child (`research\scraping\`), except R3, which is parent (`research\global\`) because S-D3 reads it too
Readers: S-D1; S-D3 (R3)
Drawn from: charter row S-D1 ("Demonstrates scraping and research on the Apify API. Early, because others consume its output"), D1 ("Shows the scraping and research capability on the Apify API"), D3's pipeline (enrichment, then a computed first-message variable, then import into GetSales), Scope (no real data except the D3 live run), and the risks rule (the Apify proposal stays off screen). S-D1's own problem, scope and DoD aren't written yet and the project DoD doesn't exist, so each item cites the charter line it serves instead of a DoD id.

Rules for every item: public Apify material only. Nobody opens the Apify proposal, or Alex's private `hi-apify` repo. No Apify connector is attached to this project, so nothing calls Apify's API.

- [ ] R1 Which actors. Which ready-made Apify Store actors cover the research jobs a GTM scraping demo would show: company websites, LinkedIn company pages, profiles and posts, job postings, Google search and news? For each, does it need a login or cookies, what does a run cost, and how reliable is it right now? Is there a converged stack GTM engineers use on Apify for account and stakeholder research, and what are its traps? · serves: D1 "scraping capability" · tools: WebSearch, web-fetch (Apify Store, docs, changelogs, practitioner posts) · deep: no
- [ ] R2 Driving Apify from this project. What's the simplest reliable way for a Claude Code session to run Apify actors and collect the results within a day: the REST API, the official JS or Python client, the Apify CLI, or Apify's MCP server? Which run pattern (sync or async, datasets, webhooks) fits a pipeline that must work first time? What breaks? · serves: D1 "on the Apify API" · tools: WebSearch, web-fetch, `gh` read-only on Apify's public repos · deep: no
- [ ] R3 From scraped data to research. What's the converged pattern for turning raw scraped pages and posts into structured account and stakeholder research with an LLM: schemas, source citation, dedupe, hallucination checks? What fields and format do downstream steps need, such as CSV enrichment before a GetSales import and a computed first-message variable? (S-D3's own list probes GetSales itself.) · serves: D1 "research capability"; "its output feeds several other specs"; D3's enrichment step · tools: WebSearch, web-fetch · deep: no
- [ ] R4 Running it on camera. What does a demo-sized run cost on Apify's free and paid plans, how long do typical actors take, and what do practitioners do so a live scraping demo doesn't fail on screen (small inputs, cached runs, a recorded fallback)? · serves: D1 as a demo; P3 (the operator's recording time) · tools: WebSearch, web-fetch · deep: no
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for S-D1's methodology
- [ ] DIRECTORY.md entries for every report above
