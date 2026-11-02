# C19: the agent view's output joins website's reading list (OUTPUT S-D1)

Status: applied 19:10
Asked by: `s-d1-scraping`, `OUTPUT S-D1: agent view ready at scraping\agent-view\out\` (S-D12, DoD-25; generator in 994adcb). No `readers` field; the reader is S-D8 (`website`), which runs the generator before each deploy and adds the person/agent toggle (charter, S-D12 row).
Approval: none needed. An OUTPUT message is a resource line, with no preview (SPEC section 4, item 4).
New ids: none.

## Places

- Charter: untouched.
- `website\SPEC.md`, "Routing and resources": one line added after the `content\docs\` line, naming the generator and its output.
- Every other place: untouched.

## Ruling sent with it

`s-d1-scraping` redacted the docs' 9 mentions of the Apify proposal and of his own GetSales outbound as "[redacted]" in the agent copies, though the live docs show those words. Orchestration overruled it: the agent copy carries the live words exactly. D12 says the track "can't drift from what a person sees". DoD-22 lets the charter and specs name both. A "[redacted]" in a hiring manager's LLM reads as something hidden. And over-caution is the failure Alex has named most often. If he wants the phrase gone, it goes from the live docs first, through `website`'s `sync_docs.py` deny-list, and the agent copy follows on the next run.

## Held

None.
