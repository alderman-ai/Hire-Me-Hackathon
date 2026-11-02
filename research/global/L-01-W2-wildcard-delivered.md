# W2 Wildcard: can it be delivered?

**Question (verbatim):** When the 15:30 LinkedIn alert puts the site in front of Addvery's six stakeholders, what actually reaches each of them (the note, the link, its preview), when are they likely to click, and will the link land on something that works and reads as finished, today, overnight and after the hand-over?

2 Nov 2026 · session s1-research subagent · item 6 of 7 on list L-01

Lens: W2, "can it be delivered?" Once it's built, can it be shipped and put in front of the people it's for?

---

## (a) Gap analysis

### What the other items cover

| Item | Covers | Doesn't cover (in this lens) |
| --- | --- | --- |
| R1 Making the work legible | How a non-technical decision maker reads the site in under a minute; converged patterns; what reads as a toy | How the reader gets to the site, or when they arrive |
| R2 What a GTM engineer is hired to show | What hiring managers want; which deliverables show it | Nothing about shipping |
| R3 Personal data on a public site | GDPR and LinkedIn terms for scraping, publishing and the live outbound run; what stays off the site | Whether the outbound run delivers anything that works |
| R4 Does the format land | How recipients react to a personalised application site; impressive or creepy; what makes them act | The mechanics before that reaction: the message, the link, the page they land on |
| W1 Can it be executed? | Can it be built in time with these tools | What happens after it's built |
| W3 Will it be received? | The reception lens (overlaps R4) | The delivery route itself, which comes first |

### Everything left open in this lens

From the charter, the project DoD, the website spec and CLAUDE.md, and the GetSales spec (all read-only):

1. **The route.** The only planned way the six stakeholders receive the site is the GetSales alert. It's a LinkedIn connection request whose note is the alert, with `custom message 1` sent as the first message once they accept. It's timed for 15:30 Prague and tells them "they can follow along at the site" (`getsales\SPEC.md` §1 and §7; Alex in DI-6: "just letting them know this is happening and that they can follow along"). No item asks what that route physically delivers.
2. **Arrival state.** The alert goes out hours before the site is the application. The brand pass waits on Alex's capture. The six stakeholder sections wait on his gate, and from 18:00 an open gate stays open until the morning (`website\SPEC.md` §7 step 6).
3. **The URL and its preview.** The domain is `vercel.app`. Nobody has checked for Open Graph tags, a preview card, or the login wall Vercel puts on deployment-specific URLs.
4. **Hosting terms.** The site runs on Vercel Hobby, which is for non-commercial use only. A pause shows visitors a 503 and doesn't lift on its own.
5. **Durability after the hand-over.** Hobby deployment retention, Blob limits, and the countdown's end state.
6. **Videos.** YouTube's 15-minute cap for unverified channels, embedding unlisted videos, and processing time overnight.
7. **The public repo as an ungated channel.** The watcher pushes every hour, the specs there are unredacted, and pushed history can't be pulled back. Alex already chose "leave it" in website-Q3, and DoD-22 checks it.
8. **Search indexing** of the stakeholder pages. Mostly R3 territory.
9. **Mobile and in-app browsers.** Most LinkedIn use is mobile, and links open in the LinkedIn app.
10. **What "delivered" means at the hand-over.** Who tells the six it's finished, and with which link.
11. **Knowing it was received**: analytics and per-person links. This overlaps R3 on privacy.

### Ranked shortlist

Ranked by: whether it affects the outcome (the six seeing a working, credible application), how likely it is to go wrong, whether anyone else covers it, and how soon it bites.

1. **Route plus arrival** (1, 2, 3 and 9). The alert is the one delivery channel, it's irreversible once sent, it fires at 15:30, and nobody owns its delivery mechanics. Highest on every criterion.
2. **Hosting terms and outright failure modes** (4, and part of 3). Low probability, but a 503 or a login wall at the moment of the click means no delivery at all.
3. **What "delivered" means at the hand-over** (10, 5). It shapes the morning cleanup, but there's still time.
4. **Videos** (6). The cap is known and logged in `website\CLAUDE.md`, and the upload flow exists.
5. **The public repo** (7). Alex has decided it, and DoD-22 covers the check.

### Why I picked this question, and what I passed over

I picked item 1 and folded in the failure modes from item 2 that sit on the same route (login walls, the Hobby pause). The report lands about 30 to 40 minutes before the alert's 15:30 target. The alert is the only moment this project puts anything in front of the six, and it can't be unsent.

Passed over:
- Videos: known and handled.
- The public repo: decided by Alex (website-Q3).
- Indexing and analytics: R3 owns the privacy side.
- The morning hand-over: it gets a short checklist in (c), not its own research.

---

## (b) Research

### Method

- **When:** 2 Nov 2026, 14:40 to 15:15 Prague.
- **Local reads, read-only:**
  - `CHARTER.md`, `research\lists\L-01-parent.md`, `orchestration\DOD-DRAFT.md`, `SESSIONS.md`, `research\SPEC.md`.
  - `website\SPEC.md`, `website\CLAUDE.md`, `website\DECISIONS.md`, `website\app\layout.tsx` and `page.tsx`, and the feed titles in `website\content\feed.json`.
  - `getsales\SPEC.md`.
  - The "What this is" section of `Operator tasks\Decide - how the GetSales outbound demo runs.md`, and the relevant line of the scraping-demo decision file.
  - Not opened: `Addvery Research\`, `getsales\live\` (doesn't exist yet), anything to do with GetSales accounts or flows, and the Apify proposal.
- **Live probe:** one unauthenticated read of `https://hire-me-hackathon.vercel.app/`, `/robots.txt` and `/opengraph-image` with curl, at about 14:55. Headers and `<head>` tags only. No Vercel MCP or GetSales calls.
- **Web, with WebSearch and WebFetch (both worked):**
  - LinkedIn Help on invitation notes and on sharing with Open Graph.
  - Vercel docs on fair use, Deployment Protection, `.vercelignore`, ignored files, retention, pauses and Hobby domains.
  - Next.js docs on `opengraph-image`.
  - Vendor benchmark studies on LinkedIn acceptance and timing (Belkins, Expandi).
  - Security reports on `vercel.app` phishing (Kaseya/INKY, Cloudflare).
  - YouTube Help on long uploads.
- **Limits of the evidence:**
  - Most LinkedIn outreach numbers come from sales-tool vendors with a commercial interest.
  - LinkedIn doesn't document how links behave in invitation notes.
  - Both are flagged where they're used.

### Verdict

1. **The route reaches all six, but mostly as a short note.** On cold-outreach averages, about 1.6 to 1.7 of the six will accept and get the follow-up messages, and there's roughly a 13 to 16% chance none of them do (inference from [Belkins](https://belkins.io/blog/linkedin-outreach-study) and [Expandi](https://expandi.io/blog/linkedin-outreach-benchmarks) averages). For most of them, the note is the whole delivery:
   - LinkedIn's own help page caps it at 200 characters ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/46662)).
   - No source settles whether a URL in the note is clickable.
2. **Anyone who clicks will probably do it today or tomorrow, before the site is finished.** The median acceptance comes 1 day after the invite, and over 62% of acceptances happen within 24 hours ([Belkins, June 2026](https://belkins.io/blog/linkedin-response-time-study)).
   - At 14:55 the live site didn't mention Addvery once. It opened on process content: the countdown, the explainer and the agents' charter (live probe).
   - The stakeholder sections can't go live before Alex's gate, and from 18:00 they wait for the morning (`website\SPEC.md` §7 step 6).
3. **The link arrives bare and on a domain security teams are told to distrust.**
   - The homepage has no `og:title`, `og:image`, `og:description` or `og:url`. LinkedIn lists all four as required for a preview ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/46687); live probe).
   - `*.vercel.app` links from unknown senders are now named in security guidance as a phishing signal ([Kaseya/INKY, June 2026](https://www.kaseya.com/blog/phishing-campaigns-abusing-vercels-free-hosting-platform/); [Cloudflare, Jan 2026](https://www.cloudflare.com/cloudforce-one/research/report/vercel-hosted-rmm-abuse-campaign-evolves-with-telegram-c2-for-victim-filtering)).
4. **Two things can turn the link into a dead end.**
   - **A deployment-specific URL, instead of the production alias, hits Vercel's login wall** under Standard Protection ([Vercel docs](https://vercel.com/docs/deployment-protection)).
   - **A Hobby pause serves `503 DEPLOYMENT_PAUSED`**, and paused projects "resume one at a time, never automatically" ([Vercel KB](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked)). Hobby is "non-commercial personal use only" ([Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines)). Whether a job application counts as commercial isn't settled.
5. **After the hand-over, the hosting itself holds.** On Hobby, aliased deployments are kept whatever the retention settings, so the live site doesn't age out ([Vercel changelog](https://vercel.com/changelog/hobby-projects-now-default-to-30-day-deployment-retention)). The risks are what the page says and the pause, not storage.

The question was "can it be delivered?" The answer: **yes, technically. As planned, though, the alert delivers a bare, possibly unclickable `vercel.app` link to a page that isn't yet about them, at the moment they're most likely to look.** Each gap is small and cheap to close, but the alert is the deadline for most of them.

### Evidence

#### B1. What physically reaches each stakeholder

**The planned route.** `getsales\SPEC.md` §1, DI-7 question 1, default A:
- For people Alex isn't connected to, the alert is "a connection request whose note is the alert, with `custom message 1` as the first message on acceptance".
- Then come "a message on why he's doing this; then one more" (§7).
- `custom message 1` carries "the alert's point: the hackathon is happening, and they can follow along at the site" (§7 step A4).
- Nothing sends before Alex ticks the pre-send gate, and nothing sends from 18:00 (§1, §7 step 6).

**The note's limits.**
- LinkedIn's help page: "Each message can be up to 200 characters", and "You can add a personalized message to up to three connection requests per month". Premium members "can send unlimited personalized invitations" ([LinkedIn Help 46662](https://www.linkedin.com/help/linkedin/answer/46662); same text at [a563153](https://www.linkedin.com/help/linkedin/answer/a563153); both "last updated 6 months ago").
- Vendors say Premium notes run to 300 characters ([Salesforge](https://help.salesforge.ai/en/articles/10333605-connection-notes-in-multichannel), [Hublead](https://www.hublead.io/linkedin-character-limit)). LinkedIn's own page doesn't say so. **200 is the safe planning figure.**
- *Inference:* Alex uses Sales Navigator (the DI-7 file has him saving the six to a Sales Navigator lead list), so his sender probably has Premium-level invitations. Then six personalised notes aren't blocked by the three-a-month cap. I didn't check his account (out of bounds).
- The production URL `https://hire-me-hackathon.vercel.app` is 36 characters, 18% of a 200-character note. Without `https://` it's 28.

**Is a URL in the note clickable?** Not established.
- One third-party blog says "Hyperlinks aren't clickable in initial connection requests" ([HyperClapper](https://www.hyperclapper.com/blog-posts/write-linkedin-connection-requests-templates)).
- LinkedIn's help pages don't mention links in notes at all (both pages above).
- Treat it as unknown. If it isn't clickable, a non-accepter has to copy or retype the URL, and a short, memorable address matters more.

**What reaches the people who accept.**
- Message 1 and the follow-ups go into a normal LinkedIn thread. *Inference:* links there are clickable and LinkedIn tries to draw a preview card, which needs the Open Graph tags (B3). I found no LinkedIn documentation on previews in direct messages specifically.
- Anecdotally, LinkedIn shows a "You are leaving LinkedIn" warning on some outbound links ([freshvanroot](https://freshvanroot.com/blog/you-are-leaving-linkedin/)). No official account of when it appears.

#### B2. How many get past the note, and when

**Acceptance rates for cold requests (vendor data):**

| Source | Sample | Acceptance |
| --- | --- | --- |
| [Expandi, May 2026](https://expandi.io/blog/linkedin-outreach-benchmarks) | 13.2M requests, May 2025 to Apr 2026 | 28.5% platform-wide |
| [Belkins](https://belkins.io/blog/linkedin-outreach-study) | 20M+ attempts | 26.42% with a note, 26.37% without |

- A note barely moves acceptance, but nearly doubles replies to the request itself: 9.36% against 5.44% ([Belkins](https://belkins.io/blog/linkedin-outreach-study)).
- Expandi's seniority split is by sender, not recipient, so it says nothing about executives as recipients.

**Timing:** from [Belkins' response-time study](https://belkins.io/blog/linkedin-response-time-study) (published 29 June 2026; 152,636 contacts, Mar 2025 to Feb 2026):
- The median time from invite to acceptance is 1 day.
- "Over 62% of connections happen within the first 24 hours."
- 91% of everyone who will ever accept has done so by two weeks.
- Every seniority tier had a median of exactly 1 day to accept.
- C-level and VP contacts averaged 13 to 14 days to reply, against 10 to 11 for directors and below.

Unanswered invitations reportedly lapse after about six months, with up to two reminders to the recipient ([Phantombuster](https://phantombuster.com/blog/sales-prospecting/do-linkedin-connection-requests-expire/); secondary, citing LinkedIn's FAQ).

**What that means for six people.** *Inference:* this assumes independence and that the six behave like the vendor average, and neither is known.
- At 26 to 28.5%, the expected number of acceptances is 1.6 to 1.7.
- The chance that none of the six accept is 0.715⁶ ≈ 13% to 0.736⁶ ≈ 16%.
- Most acceptances come within 24 hours, so message 1 most likely lands this evening or overnight, while the site is being built autonomously and before the morning cleanup.
- C-level replies come about two weeks later on average. Any conversation would then happen after the hand-over, against the finished site.

A warm, specific note to a company's leadership about a job application could do better than cold sales averages, or worse. No evidence either way.

#### B3. What the link looks like when it arrives

**The preview card.**
- LinkedIn's sharing page says `og:title`, `og:image`, `og:description` and `og:url` "must exist". The image needs a minimum of 1200×627 px, a 1.91:1 ratio and a maximum of 5 MB ([LinkedIn Help 46687](https://www.linkedin.com/help/linkedin/answer/46687)).
- **Live probe (about 14:55):** the homepage `<head>` has only `charset`, `viewport`, `<title>` and `meta name="description"`. There are no `og:` tags at all, and `/opengraph-image` returns 404.
- The cause is in the code: `app\layout.tsx` sets only `title` and `description` in its `metadata`.
- **The fix is small.** Next.js adds `og:image` and its size tags automatically when an `opengraph-image.(png|jpg)` file sits in `app\`. The file can also be a generated `opengraph-image.tsx` ([Next.js docs, updated July 2026](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)). `og:title` and `og:description` come from the `openGraph` metadata field (*inference* from the same metadata API; not checked against the repo's Next 16 docs in `node_modules`).
- **Caching (weak evidence).** Vendors say LinkedIn caches a URL's preview for up to about 7 days ([flowpoint](https://blog.flowpoint.ai/post/v2/this-is-what-causes-your-screenshot-to-be-cached-too-soon-on-linkedin-and-how-to-fix-it/)). They also say a Post Inspector refresh only affects new shares ([Taplio](https://taplio.com/blog/linkedin-post-inspector)). LinkedIn's page says nothing about caching.
- *Inference:* if the first message with the link goes out before the tags exist, those six threads may keep a bare card.

**The domain.**
- [Kaseya/INKY, 10 June 2026](https://www.kaseya.com/blog/phishing-campaigns-abusing-vercels-free-hosting-platform/) describe three phishing clusters on `*.vercel.app`, with 6,283+ emails blocked across 2,030+ organisations from Dec 2025 to May 2026. Their advice: "Treat `*.vercel.app` and `*.netlify.app` links from unknown senders with elevated suspicion". They don't recommend blanket blocking.
- [Cloudflare, 20 Jan 2026](https://www.cloudflare.com/cloudforce-one/research/report/vercel-hosted-rmm-abuse-campaign-evolves-with-telegram-c2-for-victim-filtering) suggests "enhanced monitoring of links from vercel.app and surge.sh subdomains".
- *Inference:* the alert matches the pattern that guidance describes: an unknown sender (not yet a connection), an unexpected message, a free-hosting link. The note is on LinkedIn, not email, so corporate email gateways don't screen it. The recipient's own trained caution, and any corporate web proxy, still apply.
- **The alternative is cheap on Hobby.** Hobby allows 50 domains per project ([Vercel Hobby plan](https://vercel.com/docs/accounts/plans/hobby)). A domain bought through Vercel gets its nameservers and DNS set automatically ([Vercel domains](https://vercel.com/docs/domains/working-with-domains)). Registration costs money, and it's a call on spend and naming.

**On the phone.** Estimates for LinkedIn's mobile share range from 57% to 74%, depending on the metric ([SQ Magazine summary](https://sqmagazine.co.uk/linkedin-mobile-vs-desktop-statistics.md), [Buffer](https://buffer.com/library/linkedin-statistics)). None is a LinkedIn figure. *Inference:* the first view is most likely in LinkedIn's in-app browser on a phone. The page's first screen and the YouTube embed should be checked there.

#### B4. What the link lands on, by time window

**15:30 to 18:00 today (the alert window).**
- Live probe at about 14:55, plus `page.tsx` and `content\feed.json`:
  - The title is "The Hire Me Hackathon Begins", then the recorded-time countdown.
  - Next comes a "start here" box: "Watch the 13-minute explainer, then read the plan the agents work from".
  - Then the feed: milestones about tooling, research lists and the definition of done.
- "Addvery" appears 0 times in the served HTML, and 0 times in `content\feed.json` and `app\*.tsx`.
- The site's own spec says it "isn't an application to Addvery yet. It has no Addvery branding, no stakeholder sections" (`website\SPEC.md` §4).
- The brand pass waits on Alex's capture. The stakeholder sections wait on his gate (`website\SPEC.md` §7).

**18:00 to the morning cleanup (most likely when message 1 lands, B2).**
- An open stakeholder gate "stays open for the morning cleanup session, and the sections stay off the live site" (`website\SPEC.md` §7 step 6; decision log: "never go live on a default, even after 18:00").
- The site keeps changing on its own overnight from autonomous build requests (DoD-19, DoD-20).
- *Inference:* a stakeholder who accepts tonight will most likely find a site that's visibly mid-build and has no section for them.

**After the hand-over.**
- **Hosting:** Hobby keeps deployments for at most 30 days. The 10 most recent production deployments and "any aliased deployments" are kept regardless ([Vercel changelog, Apr 2026](https://vercel.com/changelog/hobby-projects-now-default-to-30-day-deployment-retention)). September 2026 coverage reports three, not ten, recent production deployments kept, with the current production deployment never deleted ([The New Stack](https://thenewstack.io/vercel-hobby-deployment-retention/)). The live alias survives either way.
- **Videos:** unlisted YouTube videos can be embedded, though unlisted doesn't mean private ([Offeo](https://offeo.com/learn/how-to-create-an-unlisted-youtube-video); YouTube's own [embed help](https://support.google.com/youtube/answer/171780) doesn't address unlisted). Uploads over 15 minutes need a verified account ([YouTube Help 71673](https://support.google.com/youtube/answer/71673)), already noted in `website\CLAUDE.md`.
- **The clock:** Blob is the tightest Hobby limit. If it runs out, only the clock dies (`website\CLAUDE.md`, Hobby plan limits).
- **The page:** it opens on "The Hire Me Hackathon Begins" and a countdown. *Inference:* someone replying in two weeks (B2) lands on whatever the morning cleanup leaves. If the top of the page still reads as "in progress", the application never reads as finished.

#### B5. What can make the link fail outright

**1. The deployment URL instead of the production alias.**
- Vercel's current Standard Protection "protects all domains except production domains". Enabling it makes "the production generated deployment URL" restricted ([Vercel Deployment Protection, updated Sept 2026](https://vercel.com/docs/deployment-protection)).
- *Inference:* `vercel deploy --prod` prints the deployment's own URL as well as the alias. A session that pastes the printed URL (a `hire-me-hackathon-<hash>-….vercel.app` form) into the alert or a feed post sends recipients to a Vercel login.
- I didn't check the project's protection setting, because that needs a Vercel call.
- One Vercel community report says protection didn't block a Hobby CLI preview ([community thread](https://community.vercel.com/t/hobby-standard-protection-did-not-block-a-cli-preview-deployment/46017)). Either way, the behaviour is best checked in a logged-out browser, not assumed.

**2. A Hobby pause.**
- "Hobby teams are restricted to non-commercial personal use only." Commercial use is "any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production of the project". Listed examples include "Advertising the sale of a product or service". Vercel invites unsure users to contact Support ([Vercel fair use, updated Sept 2026](https://vercel.com/docs/limits/fair-use-guidelines)).
- A pause serves `503 DEPLOYMENT_PAUSED`, and "Paused projects resume one at a time, never automatically" ([Vercel KB, updated Oct 2026](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked)).
- *Inference:* a job application isn't among the examples. A page that pitches freelance GTM services comes closer to "advertising ... a service". The probability is low, but the cost is total: a dead link in six inboxes that can't be re-sent.

**3. A deploy without the git-ignored files.**
- The website spec plans to keep the brand tokens and stakeholder content in git-ignored files that "still deploy" (`website\SPEC.md` §1 question 3, §3).
- Vercel's docs: "Aside from the default exclusions, all files within your project are uploaded to Vercel if no source path is specified to be excluded in a `.vercelignore`". The default list excludes `.gitignore` as a file, not the paths it names ([`.vercelignore` docs](https://vercel.com/docs/deployments/vercel-ignore); [ignored files](https://vercel.com/docs/builds/build-features)).
- So a CLI deploy from the working tree should carry them. The spec's own step 1 already tests this.
- *Inference:* a deploy from anywhere else would ship without them and quietly drop the stakeholder sections and the brand. That means a fresh clone (say, a morning session working elsewhere) or a Git-integration build.

#### B6. Evidence gaps

- **Whether a URL in a LinkedIn invitation note is clickable.** No official source, and one unverified third-party claim. A test send would settle it, and that's Alex's call.
- **Whether LinkedIn draws preview cards in direct messages, and how long it caches them.** Vendor claims only.
- **Alex's invitation tier and GetSales' note limit for his sender.** Not checked; reading his account is out of bounds.
- **The project's Deployment Protection setting.** Not checked (no Vercel calls). The logged-out test in (c) settles it.
- **Whether the alert's text includes the URL, and where.** The text lives in git-ignored `getsales\live\`, which doesn't exist yet and is off-limits anyway.
- **How these six specific people respond.** The acceptance and timing figures are vendor averages for cold sales outreach.
- **Whether the stakeholders' employers filter `vercel.app`.** Not knowable from public sources, and Addvery research is Alex's own.
- **Whether Vercel would class this site as commercial.** Only Vercel Support can answer that.
- **GetSales' delays between the alert's messages.** They decide when message 2 and 3 land relative to the morning cleanup. Not checked.

---

## (c) Recommendations

Evidence plus options. **Every call here is Alex's.** Each item is tagged by when it bites and by the synthesis's tags: assistant-actionable, operator decision or verify first. The owners named are the sessions whose specs already cover that ground (`s-d3-getsales`, `website`). This report doesn't message them; routing goes through S1 and S2.

### Before the pre-send gate is ticked (target 15:30)

**C1. Which URL the alert carries.** *(Operator decision; evidence B3, B5.1)*
- **Option A: the production alias as it is.** Costs nothing. Downsides: a `vercel.app` domain from an unknown sender (B3), and 36 characters of a 200-character note.
- **Option B: a short custom domain bought through Vercel.** Hobby allows it, and DNS sets up automatically (B3). Costs a registration fee and a naming decision, and the alert waits a few minutes for it to resolve. The alias keeps working alongside it.
- **Option C: no URL in the note.** The note carries a plain hook, and the link goes only in message 1 on acceptance. This avoids the clickability unknown (B1), but about 70% of recipients, the non-accepters, never get the link (B2).
- Whichever he picks, the URL has to be the production alias or the custom domain, **never a printed deployment URL** (B5.1).

**C2. Check the exact URL on a phone, logged out.** *(Verify first; assistant-actionable for the `website` or `s-d3-getsales` session; B3, B5.1)*
- Open the exact string from `live\pre-send.md` in a private window, signed out of Vercel, ideally on a phone. It must load the site, not a Vercel login or a 503.
- Paste it into LinkedIn's Post Inspector to see the card the six will get. Post Inspector needs Alex's LinkedIn session, so it's his to run, or to skip.
- Options: run both checks, or only the logged-out load (no LinkedIn needed).

**C3. A preview card before the first link goes out.** *(Assistant-actionable through a `website` BUILD; B3)*
- Options:
  - A static `app\opengraph-image.png` (1200×630) plus `openGraph` title, description and URL in `layout.tsx`.
  - A generated `opengraph-image.tsx`.
  - Skip it and accept a bare card.
- Timing matters if the caching claims hold: the tags should exist before the first message with the link sends. The image must contain nothing DoD-22 forbids, and no stakeholder names.

**C4. What a stakeholder sees if they click between 15:30 and the morning.** *(Operator decision; B2, B4)*
- **Option A: leave it as it is.** The site is a build-in-public feed. The alert's own wording ("follow along") frames it as in progress. Risk: it opens on agent process content and never mentions Addvery (B4).
- **Option B: a short panel at the top for visitors from the alert.** It would say what's being built for them, what's live now, and when their section is expected (the morning, if the gate is still open after 18:00). It needs his OK, because it names Addvery on the site before the brand pass. The website spec already plans a plain line saying it's his application (§7 brand pass).
- **Option C: a dedicated landing path the alert links to,** such as a page that orients the six and links into the feed. Same content question as B, with a URL that can change later without touching the alert.
- **Option D: move the alert until the site is the application.** This trades his 15:30 target for a better first click. Most clicks come within 24 hours of the invite (B2), so the send time largely sets what they see.

### Before 18:00

**C5. The Hobby plan question.** *(Operator decision; B5.2)*
- Options:
  - Stay on Hobby and keep the site free of service-selling language.
  - Ask Vercel Support, which their guidelines invite.
  - Move the project to Pro. It's paid; check the current price.
- The point is low probability with a total, manual-recovery cost, landing exactly while the six might click.

**C6. A second delivery moment for the finished site.** *(Operator decision for `s-d3-getsales`'s sequence; B2, B4)*
- The alert already has three messages (§7).
- Options:
  - Time the last message after the morning cleanup, so it says "it's finished" and links to the final state.
  - Keep the sequence as built.
  - Send a separate manual note from Alex after the hand-over.
- C-level replies average about two weeks (B2), so the finished site is what any conversation will be about.

### For the morning cleanup (the hand-over)

**C7. A hand-over checklist.** *(Assistant-actionable; a candidate for the synthesis to route to `website` and the cleanup session; B4, B5)* The site counts as delivered when:
1. The top of the page reads as finished, with no live countdown or "Begins" framing, and says where the six sections are.
2. The six sections are live, or the page says plainly why they aren't.
3. The production alias or custom domain serves the final deployment, checked logged out on a phone.
4. The preview card is right in Post Inspector.
5. Every embedded video plays logged out.
6. The last deploy came from the working tree with the git-ignored files present (B5.3).
7. DoD-22's publish check is clean.
8. DoD-2's push is done.

Options: adopt it as written, merge it into the website spec's publish check (§7), or trim it.

**C8. Who owns delivery.** *(Operator decision; gap analysis)*
- No spec claims the delivery path from end to end. S-D3 owns the send, S-D8 owns the page, and no DoD item checks what a stakeholder actually receives.
- Options:
  - Leave it split, with these checks folded into the two specs.
  - Ask S2 for a DoD item such as "a logged-out check of the exact alert URL and its preview passed before the send".
  - Leave it to the synthesis.

---

## Sources

**LinkedIn**
- LinkedIn Help, Personalize invitations to connect: https://www.linkedin.com/help/linkedin/answer/46662
- LinkedIn Help, invitation note limits (a563153): https://www.linkedin.com/help/linkedin/answer/a563153
- LinkedIn Help, Make your website shareable on LinkedIn: https://www.linkedin.com/help/linkedin/answer/46687

**Vercel**
- Fair Use Guidelines (updated 14 Sept 2026): https://vercel.com/docs/limits/fair-use-guidelines
- Deployment Protection (updated 15 Sept 2026): https://vercel.com/docs/deployment-protection
- Why has my account or deployment been paused? (updated 2 Oct 2026): https://vercel.com/kb/guide/why-is-my-account-deployment-blocked
- `.vercelignore`: https://vercel.com/docs/deployments/vercel-ignore
- Build features, ignored files: https://vercel.com/docs/builds/build-features
- Changelog, Hobby 30-day retention (27 Apr 2026): https://vercel.com/changelog/hobby-projects-now-default-to-30-day-deployment-retention
- Hobby plan: https://vercel.com/docs/accounts/plans/hobby
- Working with domains: https://vercel.com/docs/domains/working-with-domains
- Community report, Hobby Standard Protection and CLI preview: https://community.vercel.com/t/hobby-standard-protection-did-not-block-a-cli-preview-deployment/46017
- The New Stack, Hobby deployment retention: https://thenewstack.io/vercel-hobby-deployment-retention/

**Next.js and YouTube**
- Next.js, opengraph-image (updated 9 July 2026): https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- YouTube Help, upload videos longer than 15 minutes: https://support.google.com/youtube/answer/71673
- YouTube Help, embed videos and playlists: https://support.google.com/youtube/answer/171780
- Offeo, unlisted YouTube videos: https://offeo.com/learn/how-to-create-an-unlisted-youtube-video

**LinkedIn outreach benchmarks (vendor data)**
- Belkins, LinkedIn response-time study (29 June 2026): https://belkins.io/blog/linkedin-response-time-study
- Belkins, LinkedIn outreach study: https://belkins.io/blog/linkedin-outreach-study
- Expandi, LinkedIn outreach benchmarks 2026 (19 May 2026): https://expandi.io/blog/linkedin-outreach-benchmarks
- Phantombuster, do LinkedIn connection requests expire: https://phantombuster.com/blog/sales-prospecting/do-linkedin-connection-requests-expire/
- Salesforge, connection notes: https://help.salesforge.ai/en/articles/10333605-connection-notes-in-multichannel
- Hublead, LinkedIn character limits 2026: https://www.hublead.io/linkedin-character-limit
- HyperClapper, connection request templates (link clickability claim): https://www.hyperclapper.com/blog-posts/write-linkedin-connection-requests-templates

**Link previews and LinkedIn behaviour (secondary)**
- flowpoint, LinkedIn preview caching: https://blog.flowpoint.ai/post/v2/this-is-what-causes-your-screenshot-to-be-cached-too-soon-on-linkedin-and-how-to-fix-it/
- Taplio, LinkedIn Post Inspector: https://taplio.com/blog/linkedin-post-inspector
- freshvanroot, "You are leaving LinkedIn": https://freshvanroot.com/blog/you-are-leaving-linkedin/
- SQ Magazine, LinkedIn mobile vs desktop: https://sqmagazine.co.uk/linkedin-mobile-vs-desktop-statistics.md
- Buffer, LinkedIn statistics: https://buffer.com/library/linkedin-statistics

**Security**
- Kaseya (INKY), phishing campaigns abusing Vercel's free hosting (10 June 2026): https://www.kaseya.com/blog/phishing-campaigns-abusing-vercels-free-hosting-platform/
- Cloudflare Cloudforce One, Vercel-hosted RMM abuse campaign (20 Jan 2026): https://www.cloudflare.com/cloudforce-one/research/report/vercel-hosted-rmm-abuse-campaign-evolves-with-telegram-c2-for-victim-filtering

**Local, read-only**
- `CHARTER.md`, `orchestration\DOD-DRAFT.md`, `SESSIONS.md`, `research\SPEC.md`, `research\lists\L-01-parent.md`
- `website\SPEC.md`, `website\CLAUDE.md`, `website\DECISIONS.md`, `website\app\layout.tsx`, `website\app\page.tsx`, `website\content\feed.json`
- `getsales\SPEC.md`; `Operator tasks\Decide - how the GetSales outbound demo runs.md` ("What this is" only); `Operator tasks\Decide - how the scraping demo should work.md` (line 84)

**Live probe**
- `https://hire-me-hackathon.vercel.app/`, `/robots.txt` and `/opengraph-image`: unauthenticated GET, 2 Nov 2026, about 14:55 Prague
