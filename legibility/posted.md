# Posted

Every post sent to the website, and every item deliberately left out.

**How the site works now (website, 14:20).** At Alex's direct request, the site became a live feed, newest on top, in `..\website\content\feed.json`. Each post has an id, an `at` time, a kind (Status, Update, Milestone, Insight, Session or Explainer), an optional session, a title and blocks (p, list, quote with source/href/note, highlight, video by session and start). "What's being built today" is the post with id `status`: a status update sends as_of and the changed rows, and moves it back to the top. "Add a post" means a new entry on top. The website's own subagent posted 8 Insights from S03 to S05 (spec sizing, three tribes, agents decide when Alex is away, the micromanagement pendulum, the gut-feeling charter call, merges vs breaks, one question per agent, research before method), so don't repeat those topics. Check the feed's titles before drafting.

| Id | What | Source | Why it's worth showing | Live at |
| --- | --- | --- | --- | --- |
| P1 | "What's being built today": how the project runs, the 3 tooling pieces and 10 demos, each with a status at 13:50 | S04 at 08:23; CHARTER.md; SESSIONS.md; git log | The site only had the intro video. Alex asked on camera (S04 08:23) for the deliverables on the site "so people kind of know what to expect". | 13:50 (website e07e790), content in website\content\build.json |
| P2 | "The story so far": timeline S01 to S06 with one quote each, the 13:20 deletion and its recovery, bootstrap done; P1 statuses updated to 13:51 | S01 to S06 transcripts; 13:27 recovery notice; git log ea9017e, 0619773, 80c145a | Followers see the best moments in Alex's own words without watching hours of video, and the incident shows how the setup recovers. | 13:55 (website 0f7cc51), content in website\content\story.json. Website also uploaded S06 to YouTube (mxorwucznvE) and linked its quote. |
| P3 | Two milestones on the timeline: the definition of done signed off at 14:02 with S2's tools built, and the first five research lists with the wildcards; P1 statuses to 14:15 | DOD-DRAFT.md; commits 40f5f45, 0f83fe4, bb71f33, aaa69a4, f2ecd10, 81333db, c7558a0; OT-01 | The plan now has a checkable finish line, and research is about to fan out. These are the first signs of the parallel phase S06 promised. | 14:20 (website, same build that turned the site into a feed) |
| P4 | S07 session post (briefing session, this feed, recovery skill, approval checkboxes), Insight on API keys never moving on camera, Milestone "Every demo has a plan" (spec drafts, research running, scraping launched, plain-names rule), status to 14:45 with Apify named | S07 02:07, 05:04, 08:20, 33:29, 35:43; commits 96fa0bb, cb05028, a3f9451, 1ca60d9, spec drafts 14:22 to 14:34 | How Alex steers a dozen agents, a trust signal for a tech team (keys off camera), and the jump from one plan to a plan per demo. Roles: post 1 CEO/COO/CTO, post 2 CTO/CAIO, post 3 all. | sent 14:50, waiting for BUILT |

## Sessions covered (DoD-20)

Every filed rig session, and the post that carries its best moments.

| Session | Filed | Covered in | Notes |
| --- | --- | --- | --- |
| S01 | 10:34 | P2 | Opening quote, linked |
| S02 | 11:25 | P2 (and the site's featured video) | Knowledge arbitrage quote, linked |
| S03 | 12:15 | P1, P2 | Movie-actor rule, clarity quote; not on YouTube (39 min) |
| S04 | 12:39 | P1, P2 | The deliverables ask, the "mistakes cascade" quote; not on YouTube (23 min) |
| S05 | 13:34 | P2 | Handoff to the agents, the 13:20 incident and recovery; not on YouTube (49 min) |
| S06 | 13:36 | P2 | Status update, linked (website uploaded it as mxorwucznvE) |
| S07 | 14:42 | P4 | Briefing session, this feed, recovery skill, keys off camera; not on YouTube (38 min) |

## Left out

| When | What | Why |
| --- | --- | --- |
| 13:50 | The name of the scraping tool behind demo 1 | Alex said it next to the recent proposal (S04 09:23 to 09:31). Too close to the Apify-proposal rule. **Lifted 14:35:** Alex answered DI-6 Q6.3 "yes" (option A), so the site may name Apify, in posts too. The S04 stretch near the proposal still stays out. |
| 13:50 | How the outbound demo runs live: whose sender profile, the six stakeholders, who gets a view of it (S04 03:00 to 05:12) | Alex's own GetSales outbound, research about the company's people, and a person other than Alex. All on the never-post list. |
| 13:50 | Who is in the company research, and the git-ignore decision about it (S05 21:40 to 22:53) | Research about the company's people stays off until Alex says so. The decision is harmless, but it isn't needed to explain anything yet. |
| 13:50 | Alex's swearing and his complaints about the desktop app (S01 07:16, S04 00:13 to 01:37, S05 40:14) | Not useful to followers, and a bad look in a job application. The good part, that he works best in the terminal, can come up in a later post if it helps. |
| 13:50 | Alex's personal notes about usage limits and screens (S05 23:41) | Not interesting to followers. |
| 14:15 | The proposed research question on personal data and publishing sections about named people (OT-01, R3) | It is about the company's people and the live outbound run, both on the never-post list. |
| 14:50 | The 15:30 alert campaign in the GetSales spec, and the person named as routing leads (getsales/SPEC.md) | Alex's own GetSales outbound, the company's people, and a person other than Alex. |
| 14:50 | The project and repo names Alex read out while moving keys (S07 34:31 to 35:11) | Garbled, and one may be close to the proposal. Not needed. |
| 14:50 | "I don't feel like we're doing a good job right now" (S07 23:36) and the swearing at 10:49 | A passing low moment. The control-room post already shows the overwhelm, with the fix. |
