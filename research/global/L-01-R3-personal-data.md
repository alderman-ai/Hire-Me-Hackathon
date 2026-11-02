# R3 Personal data on a public site

> "What do GDPR and LinkedIn's terms allow when a project scrapes public information about six named people, publishes a section about each on a public website, and runs them through a live outbound sequence from the operator's own account? What's the converged safe practice for personalised outreach of this kind, and what should stay off the site?"

2 Nov 2026
session s1-research subagent
item 3 of 7 on list L-01

Serves: DoD-13 (the live run on the six), DoD-18 (six stakeholder sections on the live site), DoD-22 (nothing published shows what it shouldn't). Main readers: the scraping demo, the GetSales outbound demo and the website specs.

This is not legal advice. It's a research summary of primary texts, regulator guidance and enforcement, written so the specs can make informed choices.

## Method

- **When:** 2 Nov 2026, roughly 14:40 to 15:30 Prague time, one pass.
- **Searched (WebSearch):** EDPB legitimate-interest guidelines; CNIL sanction against KASPR; CNIL B2B prospecting and email-reconstruction sheets (Oct 2026); CNIL web-scraping focus sheet (Jan 2026); Dutch AP scraping guidance; Polish UODO Bisnode case; the 2023 and 2024 global joint statements on scraping; Czech Act 480/2004 (anti-spam) and ÚOOÚ practice; the Czech digital economy bill; Czech Civil Code §§ 84 to 85 (likeness); ICO guidance on social media DMs; LinkedIn's User Agreement, Professional Community Policies and prohibited-software page; hiQ v. LinkedIn, LinkedIn v. Proxycurl and ProAPIs, Meta v. Bright Data; CJEU Lindqvist and KNLTB; Sales Navigator export; GetSales' own public description.
- **Fetched and read directly (WebFetch):** LinkedIn User Agreement (three passes), LinkedIn prohibited-software help page, Professional Community Policies, CNIL KASPR decision page, CNIL email-reconstruction sheet, CNIL 2009 B2B page, CNIL scraping focus sheet, GDPR Art. 14 and Art. 21 text, Czech Act 480/2004 text, UODO's Bisnode announcement, a summary of a CNIL page via Leto. The **EDPB Guidelines 1/2024 PDF** was downloaded and its text extracted locally, so paragraph numbers below are from the document itself.
- **Couldn't fetch:** ICO pages (HTTP 403). ICO points below come from search-result snippets and are marked as such. Some items (Dutch AP, KNLTB, hiQ, Proxycurl, Sales Navigator export) rest on reputable secondary sources and are marked.
- **Not done, by rule:** no lookup of Addvery or any of its people; no access to `Addvery Research\`, the Apify proposal, Alex's private repos or his GetSales account.
- **Marking:** every substantive claim has a link. "Inference:" marks my own reasoning from those sources.

## Verdict

1. **The outreach is the defensible part.** Messaging six senior professionals on LinkedIn about a job, using their public professional data, can rest on legitimate interest (GDPR Art. 6(1)(f)) if three things are in place. First, a short written balancing test done before processing. Second, minimal data. Third, a first message that carries the Art. 14 information (at least as a link) and states the right to object explicitly and separately (Art. 21(4)). Inference: with six people and a job-seeking purpose, the GDPR enforcement risk is low. The open question is Czech anti-spam law. It requires prior consent for electronic "commercial communications", has no B2B exception, and may reach LinkedIn messages. A pitch for paid freelance services is far more exposed than a job application.
2. **LinkedIn's terms are the practical risk, and the risk lands on Alex's own account, not a fine.** The User Agreement bans scraping (8.2), copying or displaying information obtained from LinkedIn (8.2), and bots or automated methods that send messages (8.2). LinkedIn can restrict or close the account (3.4). Three planned steps touch these lines: Apify scraping of LinkedIn, a third-party CSV export from Sales Navigator, and automated sending through GetSales. Alex's own LinkedIn profile is his main job-search asset.
3. **The public stakeholder sections are the weakest point legally.** Publishing a named profile of private professionals to the whole internet is a separate purpose from contacting them. The EDPB's own example says people who published photos themselves still can't reasonably expect a third party to republish them. Converged practice, pieced together because no regulator addresses this exact format: keep each section about the role and the company's public agenda, not the person. Use only professional facts, preferably from company sources. Use no photos. Give notice before (not after) the section goes public, and offer one-click removal. Unlisted or consent-gated sections lower the risk further.
4. **Recordings and the public repo count as publication too.** The six people's data, especially any replies they send, needs the same care as secrets. Inference: as written, DoD-22 doesn't list the six people's personal data, and DoD-13 wants a clip of the live run in GetSales. Those two items pull against each other and need a call (see Recommendations).

## Evidence

### 1. Does GDPR apply, and who is responsible?

**Converged answer: yes, and Alex is the controller.**
- Alex is resident in Prague, so GDPR applies to processing he does there ([GDPR, Art. 3(1), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)). Inference: he decides the purposes and means, so he is the controller. Apify and GetSales act as his processors.
- The household exemption doesn't cover this. The CJEU held in *Lindqvist* (C-101/01, 2003) that naming people on an internet page is processing of personal data, and the exemption doesn't extend to publication to an indefinite audience ([FRA case summary](https://fra.europa.eu/sk/caselaw-reference/cjeu-case-c-10101-judgment); [Wikipedia summary](https://en.wikipedia.org/wiki/Bodil_Lindqvist_v_%C3%85klagarkammaren_i_J%C3%B6nk%C3%B6ping)).
- "Public" data is still personal data. Twelve data protection authorities said so in their 2023 joint statement on scraping, and 16 to 17 repeated it in 2024 ([OAIC, 24 Aug 2023](https://www.oaic.gov.au/news/media-centre/global-expectations-of-social-media-platforms-and-other-sites-to-safeguard-against-unlawful-data-scraping); [FDPIC, concluding statement, 31 Oct 2024](https://edoeb.admin.ch/en/31102024-concluding-statement-on-data-scraping); [OPC Canada, 28 Oct 2024](https://priv.gc.ca/en/opc-news/news-and-announcements/2024/nr-c_241028/)). In Oct 2026 the CNIL said: "Le fait que les données utilisées … soient accessibles sur Internet ne dispense pas" organisations from the rules ([CNIL, reconstitution sheet, 16 Oct 2026](https://cnil.fr/fr/node/169044)).

**Trap:** the "it's public, so it's free to use" assumption. Every regulator source above rejects it.
**What would change the plan:** nothing. GDPR applies to all three activities (scraping, outreach, publication).

### 2. Lawful basis: legitimate interest, tested three times

**Converged answer: Art. 6(1)(f) is the usual basis for B2B prospecting and scraping, but only after a documented test.**
- Recital 47 says direct marketing "may be regarded as carried out for a legitimate interest". The EDPB adds that this "does not mean that direct marketing always constitutes a legitimate interest" ([EDPB Guidelines 1/2024, v1.0, 8 Oct 2024, paras 109 to 110](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf)).
- The test has three cumulative conditions: a legitimate interest, necessity, and a balancing test. Controllers "should carefully assess and document whether these three cumulative conditions are met … before carrying out the relevant processing" (same, executive summary).
- A commercial interest can be legitimate. The CJEU rejected the Dutch AP's view that it can't in *KNLTB* (C-621/22, 4 Oct 2024) ([judgment, BAILII](https://www.bailii.org/eu/cases/EUECJ/2024/C62122.html); [A&O Shearman summary](https://www.aoshearman.com/en/insights/ao-shearman-on-data/cjeu-commercial-interests-of-controller-can-serve-as-a-legitimate-interest)). Inference: an individual's interest in getting hired is at least as clearly legitimate.
- **Reasonable expectations** carry weight in the balancing test. The EDPB says sector habit isn't enough: "The fact that certain types of personal data are commonly processed in a given sector does not necessarily mean that the data subject can reasonably expect such processing" (para 52). Giving notice doesn't create expectations by itself (para 53). One relevant factor is "the (professional) position that the data subject holds" (para 54). Inference: senior people on a professional network can expect to be approached about jobs and services, so that supports the outreach. It doesn't extend to a public profile page about them.
- **Necessity and minimisation:** controllers must check whether the interest "cannot reasonably be achieved just as effectively by other means less restrictive", and must respect data minimisation (para 119). Intrusive profiling makes the balancing test "hardly yield positive results" (para 120).

**Traps:**
- *Three purposes, three tests.* Inference: scraping for research, messaging, and publishing on a public site are distinct purposes. Each needs its own necessity and balancing check, and publication fails most easily (section 7).
- *Restricted-visibility data.* The CNIL found KASPR's collection of contact details that users had limited to their 1st- and 2nd-degree network unlawful. It said the collection "exceeded what could reasonably be expected from people who register on a professional social network" ([CNIL KASPR decision, 5 Dec 2024](https://www.cnil.fr/en/data-scraping-kaspr-fined-eu200000)).
- *Special categories (Art. 9).* Inferring health, religion, politics, union membership, sexual orientation or ethnicity triggers a stricter regime ([GDPR Art. 9](https://gdpr-info.eu/art-9-gdpr/)). The CNIL expects scrapers to exclude such data and delete it immediately if it slips in ([CNIL scraping focus sheet, 5 Jan 2026](https://www.cnil.fr/en/legal-basis-legitimate-interests-focus-sheet-measures-implement-case-data-collection-web-scraping)).
- *The strict Dutch view.* The AP's 2024 guidance says scraping by private parties is "almost always" illegal and purely commercial aims fail. The Commission criticised that position and *KNLTB* undercut it, but it shows how strict a DPA can be ([privacy-web.nl summary](https://privacy-web.nl/en/nieuws/ap-scraping-bijna-altijd-illegaal/); [Morgan Lewis](https://www.morganlewis.com/pubs/2024/05/eu-regulator-adopts-restrictive-gdpr-position-on-data-scraping-impacting-ai-technologies)). Secondary sources only.

**What would change the plan:** any of the six restricting their profile, having no public footprint, or objecting. The CNIL reads the absence of an online presence as a "strong indication" that a person doesn't want to be reached that way ([CNIL, 16 Oct 2026](https://cnil.fr/fr/node/169044)).

### 3. Scraping public LinkedIn and web data with Apify

**Converged answer: lawful under legitimate interest only with tight safeguards. The enforcement record targets scale, restricted data, over-long retention and missing notices.**
- **KASPR (France, €240,000, 5 Dec 2024).** The CNIL found four breaches: no legal basis for restricted-visibility data (Art. 6), five-year rolling retention (Art. 5(1)(e)), late English-only notices that weren't "transparent nor comprehensible" (Arts 12 and 14), and access replies that only said "publicly accessible sources" (Art. 15). It ordered notification "in a language they understand" ([CNIL EN](https://www.cnil.fr/en/data-scraping-kaspr-fined-eu200000); [CNIL FR](https://cnil.fr/fr/aspiration-de-donnees-sanction-de-240-000-euros-lencontre-de-la-societe-kaspr)).
- **Bisnode (Poland).** The Supreme Administrative Court (III OSK 2538/21, 19 Sep 2023) confirmed that a company scraping public business registers must inform people directly under Art. 14. It held that "the transparency of processing is a rule" and exceptions "should be interpreted restrictively". The fine amount went back to UODO ([UODO, 20 Sep 2023](https://uodo.gov.pl/en/553/1572)).
- **CNIL scraping safeguards (Jan 2026, written for AI training).** Inference: they transfer to this case. Define collection criteria in advance. Exclude unneeded categories. Delete irrelevant data. Respect sites that object through robots.txt, CAPTCHAs or terms of use. Limit collection to "freely accessible data". The CNIL says processing "cannot fall within the reasonable expectations" if objecting sites aren't excluded ([CNIL, 5 Jan 2026](https://www.cnil.fr/en/legal-basis-legitimate-interests-focus-sheet-measures-implement-case-data-collection-web-scraping)).
- **Guessed email addresses (CNIL, 16 Oct 2026).** Possible under legitimate interest, case by case. Keep the address only "dans l'hypothèse où un premier contact effectif est établi". Any objection means "exclusion immédiate" ([CNIL](https://cnil.fr/fr/node/169044); [rights page](https://cnil.fr/fr/node/169047)).

**Traps:**
- Inference: off-the-shelf LinkedIn actors return whole profiles (photo, full history, skills, every post, sometimes contact details). Minimisation means configuring or filtering down to the fields the project uses, then deleting the rest.
- LinkedIn's terms object to scraping (section 6). Under the CNIL's own test, that objection undercuts reasonable expectations when LinkedIn is the source (inference from the CNIL sheet above).
- Raw datasets committed to a public repo are publication, and git history keeps them (inference).

**What would change the plan:** using company-published sources (company site, press releases, talks, interviews) for the stakeholder sections, and LinkedIn only for the outreach. That cuts both the GDPR and the LinkedIn-terms exposure.

### 4. Information duty (Art. 14) and the right to object (Art. 21)

**Converged answer: notice is required, the "disproportionate effort" exception doesn't fit six people, and the objection right must be stated in the first message.**
- **Content (Art. 14(1) and (2)):** controller identity and contact, purposes and legal basis, data categories, recipients, the legitimate interest pursued, the rights to access, rectification, erasure, restriction and objection, the right to complain, and "from which source the personal data originate, and if applicable, whether it came from publicly accessible sources" ([GDPR Art. 14](https://gdpr-info.eu/art-14-gdpr/)). It also requires a retention period (Art. 14(2)(a), primary text). Where processors outside the EEA are involved, transfer information is needed too (Art. 14(1)(f)).
- **Timing (Art. 14(3)), whichever comes first:** (a) within a reasonable period, at most one month after obtaining the data; (b) "at the latest at the time of the first communication"; (c) "if a disclosure to another recipient is envisaged, at the latest when the personal data are first disclosed" (same).
- **Exception (Art. 14(5)(b)):** "impossible or would involve a disproportionate effort". Bisnode reads it restrictively ([UODO](https://uodo.gov.pl/en/553/1572)). Inference: six people with a known messaging channel can't plausibly claim it.
- **Objection (Art. 21(2) to (4)):** for direct marketing the right is absolute. "The personal data shall no longer be processed for such purposes", and the right "shall be explicitly brought to the attention of the data subject … clearly and separately from any other information" at the latest at first communication ([GDPR Art. 21](https://gdpr-info.eu/art-21-gdpr/)). The EDPB calls it "unconditional", requiring no reasons and no balancing, to be exercisable "in an easy way and free of charge" (para 122).

**Traps:**
- *Publishing before notifying.* Inference: under Art. 14(3)(c), putting a person's section on a public URL is a disclosure, so notice must reach them no later than the moment the section goes live. A section live in the morning with the message going out that evening is the wrong order.
- *Character limits.* A LinkedIn connection note is short. Inference: a one-line plain statement of the right to object, plus a link to a notice page on the site, is the usual way to meet Arts 14 and 21(4) together.
- *Vague sourcing.* "Public sources" alone failed in KASPR. Name LinkedIn, the company site, Apify as the tool, and so on.
- *Is a job application "direct marketing"?* The EDPB, following the CJEU in *StWL*, looks at whether a communication "pursues a commercial purpose" and reaches the person "directly and individually" (para 109). Inference: a hire-me message is borderline, and a freelance-services pitch is likely direct marketing. Treating it as direct marketing costs nothing, since honouring objections immediately is good practice anyway.

### 5. ePrivacy and Czech anti-spam rules for LinkedIn messages

**No converged answer. This is the least settled question.**
- **EU rule.** ePrivacy Art. 13 requires prior consent for unsolicited direct-marketing communications "by email, SMS, MMS and other kinds of similar applications". The CJEU treats that list as non-exhaustive (*StWL*, C-102/20). National rules "may occasionally impose consent requirements that go beyond those laid down in that Directive (e.g., with respect to direct marketing towards professionals)" ([EDPB Guidelines 1/2024, paras 114 and 117, fn 137](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf)). If sending isn't allowed under national ePrivacy law, "there would be no legitimate interest" to justify collecting data for it (fn 143).
- **Czech law (where Alex sends from).**
  - Act 480/2004 defines electronic mail broadly: any "textová, hlasová, zvuková nebo obrazová zpráva poslaná prostřednictvím veřejné sítě elektronických komunikací".
  - A commercial communication covers forms of communication "určeného k přímé či nepřímé podpoře zboží či služeb nebo image podniku".
  - § 7(2) allows electronic contact details to be used for commercial communications only for users who gave prior consent. § 7(3) has an existing-customer exception. § 7(4) requires labelling, sender identity and an opt-out address ([zakonyprolidi.cz, version effective 23 Mar 2023](https://www.zakonyprolidi.cz/cs/2004-480)).
  - "User" includes legal persons, so there is no general B2B exception. ÚOOÚ enforces, with fines up to CZK 10 million ([epravo.cz](https://www.epravo.cz/top/clanky/rozesilani-obchodnich-sdeleni-a-gdpr-112733.html); [pravniprostor.cz](https://www.pravniprostor.cz/clanky/pravo-it/za-spam-padaji-milionove-pokuty-znate-vsechna-pravidla)).
  - Czech commentary says a message to the recipient's "osobního profilu či prostoru příjemce v určité aplikaci" is covered, and that a single message can be enough (same sources, via search).
- **UK comparison (persuasive only).** The ICO counts "direct messaging on social media (ie private messages)" as electronic mail under PECR (ICO key-concepts page; couldn't fetch, HTTP 403, wording from search snippet: [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/key-concepts-for-direct-marketing-using-electronic-mail/)).
- **French B2B relief.** Opt-out is allowed for professionals when the message relates to "la fonction professionnelle du destinataire" ([Leto summary of CNIL, Jun 2026](https://www.leto.legal/news/cnil-communications-electroniques-prospection-regles-2026); [CNIL 2009 page](https://www.cnil.fr/fr/node/84701)). Czech law has no equivalent relief (above).

**Traps:**
- *Job application vs. sales pitch.* Inference: a message seeking employment arguably doesn't promote "zboží či služeb nebo image podniku", so it falls outside § 7. A message offering Alex's agency services fits the definition. The wording of the six messages decides which regime applies.
- *Which country's rule applies* when a Prague-based sender messages people elsewhere in the EU is unclear (gap).
- *Law in flux.* A Czech digital economy bill would repeal and replace Act 480/2004. It was approved by the government in Nov 2025 and had its first reading on 6 Mar 2026. I couldn't confirm final adoption ([PSP stenoprotocol](https://psp.cz/eknih/2025ps/stenprot/010schuz/bqbs/b14700801.htm); [Lupa](https://www.lupa.cz/aktuality/vlada-po-mnoha-peripetiich-schvalila-navrh-zakona-o-digitalni-ekonomice/)). Inference: the consent rule comes from ePrivacy Art. 13 and would survive a replacement.
- *LinkedIn's own rule:* "Do not use our invitation feature to send promotional messages to people you don't know" ([Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)).

**What would change the plan:** framing the six messages as a job application or request for a conversation, not a services offer, and keeping any sales pitch out of the first touch.

### 6. LinkedIn's terms

**Converged answer: the terms prohibit three things the pipeline does, and the realistic consequence is account restriction.**
- **User Agreement (effective 3 Nov 2025; EU members contract with LinkedIn Ireland, Irish law, courts of residence or Ireland)** ([LinkedIn User Agreement](https://www.linkedin.com/legal/user-agreement)). Under section 8.2, members agree not to:
  - "Develop, support or use software, devices, scripts, robots or any other means or processes (such as crawlers, browser plugins …)" to scrape or copy the Services, "including profiles and other data";
  - "Copy, use, display or distribute any information (including content) obtained from the Services, whether directly or through" third parties, without the content owner's consent;
  - "Use bots or other unauthorized automated methods to access the Services, add or download contacts, send or redirect messages".
- **Consequences:** section 3.4 reserves the right "to restrict, suspend, or terminate your account if you breach this Contract or the law" (same). The help page says users of such tools "risk having their accounts restricted or shut down" ([Prohibited software and extensions](https://www.linkedin.com/help/linkedin/answer/a1341387)).
- **Community policies:** no spam, no promotional invitations to strangers, no revealing "others' personal or sensitive information (for example, doxing)", no "sale of scraped data" ([Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)).
- **Sales Navigator:** third-party guides report that LinkedIn offers no native CSV or XLS export, only CRM sync on the top tier. CSV exports come from extensions, which are the prohibited category ([Surfe](https://surfe.com/blog/how-to-export-sales-navigator-lists-to-a-csv-file); [FullEnrich](https://fullenrich.com/content/how-to-export-list-from-linkedin-sales-navigator)). Secondary sources only.
- **GetSales** describes itself as cloud LinkedIn automation with sending limits and "safety" features ([GetSales blog](https://getsales.io/blog/how-to-automate-messages-on-linkedin/)). Inference: that is the "automated methods … send … messages" category in 8.2.

**Enforcement record (US cases, relevant only for how LinkedIn behaves):**
- *hiQ v. LinkedIn.* A Nov 2022 order held the anti-scraping and fake-profile terms enforceable. The case ended in Dec 2022 with a $500,000 consent judgment and an injunction requiring hiQ to stop scraping and destroy the data ([National Law Review](https://www.natlawreview.com/article/linkedin-s-data-scraping-battle-hiq-labs-ends-proposed-judgment); [Proskauer](https://www.proskauer.com/blog/hiq-and-linkedin-reach-proposed-settlement-in-landmark-scraping-case)). The stipulated findings aren't precedent.
- *Proxycurl* (sued Jan 2025, then shut down) and *ProAPIs* (sued Oct 2025) both involved fake-account mills at industrial scale ([LinkedIn news](https://news.linkedin.com/2025/linkedin-takes-legal-action-to-defend-member-privacy); [LinkedIn news, win](https://news.linkedin.com/2025/LinkedInWinsLegalBattleToProtectMemberData); [Bloomberg Law](https://news.bloomberglaw.com/ip-law/linkedin-battles-online-scrapers-in-perpetual-struggle-over-data)).
- *Meta v. Bright Data* (N.D. Cal., Jan 2024): logged-off scraping of public data wasn't a breach of *Meta's* terms, a fact-specific district-court reading that was never appealed ([Farella Braun + Martel](https://www.fbm.com/technology/publications/major-decision-affects-law-of-scraping-and-online-data-collection-meta-platforms-v-bright-data/)). Inference: this has little bearing here. Alex is a logged-in LinkedIn member bound by the contract, and his agreement is governed by Irish law.

**Traps:**
- Inference: Apify LinkedIn actors that ask for a session cookie tie the scraping to Alex's own account. That is the most direct route to a restriction.
- Copying LinkedIn posts or photos onto the site breaches the 8.2 "display or distribute" clause and may infringe the author's copyright.
- Inference: LinkedIn sues commercial scrapers at scale. A six-profile project is very unlikely to draw litigation, but automated detection doesn't weigh intent, and the asset at risk is Alex's job-search profile.

**What would change the plan:** typing the six rows into a CSV by hand from Sales Navigator instead of using an export tool; running the six sends in GetSales at manual-like pace, or sending them by hand while GetSales shows the pipeline; using no cookie-based scraping actors.

### 7. The six stakeholder sections on the public site

**Converged answer: no regulator guidance covers this exact format (gap). The closest converged principles point to role-focused, minimal, notified and removable sections.**
- **Reasonable expectations about republication.** The EDPB's Example 6: a company uses "images of people's faces publicly available on the internet" that the people posted themselves, and "they could not reasonably expect that their photos would be processed and published by a third party" ([EDPB Guidelines 1/2024, Example 6](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf)).
- **Czech likeness law.** Civil Code § 84 requires consent to capture an identifiable likeness, and § 85 covers dissemination. § 89's exceptions are for scientific, artistic and news purposes ([podnikatel.cz, statute text](https://www.podnikatel.cz/zakony/novy-obcansky-zakonik/zneni-20210101/f4579114/); [pravniprostor.cz](https://pravniprostor.cz/clanky/obcanske-pravo/podminky-zachyceni-sireni-podoby-cloveka-prostrednictvim-fotografie)). Inference: a job-application site fits none of the exceptions, so reusing headshots needs consent. The photographer's copyright is a separate issue.
- **Necessity.** Inference: the site's goal (show Addvery what Alex would do for each stakeholder's area) can mostly be met with sections built around each role and the company's public priorities. Under the EDPB's "less restrictive means" test (para 119), that weighs against personal detail.
- **Objection to publication.** Publication isn't direct marketing, so the general Art. 21(1) objection applies: the controller must stop unless it shows "compelling legitimate grounds" ([GDPR Art. 21](https://gdpr-info.eu/art-21-gdpr/)). Inference: no job-application site could show such grounds, so in practice any objection means removal.
- **Lower-exposure options.** Inference:
  - an unlisted, `noindex` page per person, sent only to that person, is far less of a "disclosure to the world" than an indexed public page;
  - a placeholder that unlocks a person's section only after they say yes turns the hardest step into consent.

**Traps:**
- *Creep factor.* Inference: the more personal the section, the more it reads as surveillance. That is also R4's question. The legal and reception risks point the same way.
- *DoD-18 wording.* It needs "a section for each of the six stakeholders … matching DoD-10's list". Inference: role-titled sections can satisfy it without full public profiles, but that's a reading of the DoD for Alex or the orchestrator to confirm.

### 8. Recordings and the public GitHub repo

- Inference from Lindqvist and Art. 14(3)(c): a published video showing a LinkedIn profile, a GetSales lead list or a reply discloses that person's data just like the site does.
- The six people's replies are their own words in a private channel. Publishing them goes beyond anything they could expect (inference from EDPB paras 50 to 54).
- DoD-22 already keeps "the operator's own GetSales outbound" off everything published. Inference: the DoD-13 clip of the live run sits inside that ban unless it is redacted.
- Git history keeps anything ever committed. Raw scraped datasets belong outside the repo from the first commit (inference).

### Stakeholder sections: safe, risky, keep off

| Content | Rating | Why (source) |
| --- | --- | --- |
| The role or function the section addresses, and what Alex would build for it | Safe | Not personal data on its own; meets the necessity test (EDPB para 119) |
| Company-level facts and priorities from Addvery's own public channels | Safe | Company data, not personal; respects LinkedIn 8.2 when not sourced from LinkedIn |
| Name and current job title, if Alex chooses named sections | Risky (acceptable with notice before publication and one-click removal) | Professional data the person made public, but a new purpose (EDPB Ex. 6 logic; Art. 14(3)(c)) |
| Paraphrase of a public professional statement (talk, interview, company blog), with a link | Risky (keep short, attributed, linked) | Professional context helps (EDPB para 54); copying from LinkedIn breaches 8.2 |
| Verbatim LinkedIn posts or screenshots of LinkedIn profiles | Keep off | LinkedIn 8.2 "copy, use, display or distribute"; author's copyright |
| Headshots or any photo of the person | Keep off (or only with consent) | EDPB Example 6; Czech Civil Code §§ 84 to 85 |
| Career history beyond the current role, education, age, nationality | Keep off | Not needed for the purpose (Art. 5(1)(c)); reads as profiling |
| Personal email, phone, home city or address, guessed email addresses | Keep off | KASPR; CNIL reconstitution sheet; doxing ban in LinkedIn policies |
| Personality, DISC or "buyer type" profiles, "what makes them tick" | Keep off | Intrusive profiling (EDPB para 120); Art. 21(2) covers profiling |
| Anything touching health, religion, politics, union, family, sexuality, ethnicity | Keep off | Art. 9 special categories |
| Anything from restricted-visibility or connections-only content | Keep off | KASPR (CNIL, Art. 6 breach) |
| Their reaction to the outreach: accepted, ignored, replies, inbox | Keep off | Private communication; DoD-22 already covers GetSales outbound |
| A clear note on each section: why it exists, sources, "ask and it's removed" | Required | Arts 14 and 21; KASPR transparency findings |

### What the live outbound run needs

1. **A written balancing test (one page)** covering interest, necessity and balancing for scraping, messaging and publication, dated before the first scrape or send (EDPB executive summary).
2. **A notice page on the site** covering identity and contact, purposes, legal basis (legitimate interest, named), data categories, exact sources (LinkedIn, company site, tools used), recipients and processors (Apify, GetSales, host), retention date, rights, and the right to complain to ÚOOÚ (Art. 14(1) and (2)).
3. **A first message** that links to that page and states the right to object in its own sentence, for example "reply 'no' and I'll delete what I hold and stop" (Art. 21(4); EDPB para 122).
4. **The right order of steps:** notice reaches each person no later than their section going public (Art. 14(3)(c)), and in any case within a month of scraping (Art. 14(3)(a)).
5. **Immediate opt-out handling:** stop the sequence, remove the section, delete the data, keep only a suppression note (Art. 21(3); CNIL "exclusion immédiate").
6. **A first touch framed as a job application or conversation request,** with no services pitch, to stay clear of Czech § 7 and LinkedIn's promotional-invitation rule.
7. **Minimal data in GetSales:** name, title, company, profile URL and the one computed first-message variable. No guessed emails.
8. **A short sequence with a hard stop:** no follow-up after an objection or a clear non-response at the sequence's end (inference: proportionate for six people).
9. **A retention date:** delete scraped data and GetSales leads once the campaign ends, keeping only what's needed to honour objections (KASPR retention finding; CNIL reconstitution sheet).
10. **Low-automation sending:** paced like a human, no session-cookie scrapers, Sales Navigator rows entered by hand (LinkedIn 8.2 and 3.4).

## Evidence gaps

- No regulator guidance or decision addresses **personalised "job application as outreach" websites** specifically. Section 7 is built from adjacent rules.
- No DPA decision found on **cold LinkedIn messages under ePrivacy**. Whether LinkedIn DMs are "electronic mail" under the Czech act is untested. The ICO says yes for the UK, and Czech commentary leans yes.
- **Whether a job application is a "commercial communication"** or "direct marketing" isn't settled by any source I found. My reading is inference.
- **Which member state's anti-spam rule applies** when the six are outside Czechia: not established, because I didn't look up where the six are, by rule.
- **The Czech digital economy act's** final adoption and start date: not confirmed.
- **EDPB Guidelines 1/2024** were still marked "version for public consultation". I found no final version, so paragraph numbers could shift.
- **ÚOOÚ** had no scraping or B2B-prospecting guidance that I could find. The Czech position rests on the statute, decisions and commentary.
- **ICO** pages blocked fetching (403). The ICO point rests on a search snippet.
- **Short-quotation rights** under Czech copyright law for quoting public posts: not researched.
- **Where GetSales and Apify process data** (transfer information for Art. 14(1)(f)): not researched, since reading their DPAs was out of scope.
- **LinkedIn's actual detection and restriction thresholds** are unpublished. Vendor figures (e.g. GetSales' sub-5% ban rate) are marketing claims.

## Recommendations

Every call here is Alex's. The options are meant to make each call quick.

1. **How public the six sections are (DoD-18).**
   - **Option A:** role-titled sections on the public site, no names or photos. Lowest risk, and arguably still meets DoD-18.
   - **Option B:** named sections (name and title only), published only after the first message has gone, each with a removal link.
   - **Option C:** one unlisted, `noindex` page per person, sent only to them, with a public role-titled version.
   - **Option D:** placeholder sections that unlock when each person says yes.
   - Evidence: EDPB Example 6 and para 119, Art. 14(3)(c), Czech §§ 84 to 85.
2. **What goes in each section.** Adopt the table above as the website spec's content rule, or loosen individual rows knowingly.
3. **Sourcing for the site.** Either source the sections from company-published material only (avoids LinkedIn 8.2 and Example 6 problems), or accept LinkedIn-derived facts, paraphrased and minimal.
4. **First-message framing (DoD-13).** A job application or conversation request (lower anti-spam exposure) or a services offer (likely a "commercial communication" under Czech § 7, which needs consent). A hybrid can put the services pitch on the site rather than in the message.
5. **Automation footprint (DoD-13).**
   - Typing the six Sales Navigator rows into a CSV by hand vs. using an export extension.
   - Running the six sends through GetSales at manual pace vs. sending manually and using GetSales for the pipeline demo.
   - Banning cookie-based LinkedIn actors in the scraping demo.
   - Each option trades legibility of the demo against risk to Alex's own account.
6. **DoD-22 scope.** Ask the orchestrator to add "the six stakeholders' personal data beyond what the site deliberately shows, and any of their replies" to DoD-22's list, or confirm the existing "GetSales outbound" wording already covers it. Then decide how the DoD-13 clip shows the live run: blurred names and avatars, a dummy lead shown alongside, or the pipeline stages only.
7. **Paperwork.** A one-page balancing test and a notice page take about 30 minutes and cover most of the GDPR exposure. Alex decides whether to write them before the first scrape (the EDPB timing) or accept the gap.
8. **Retention.** Pick a deletion date for scraped data and GetSales leads, for example the end of the hiring conversation or 30 days, and state it in the notice.
9. **Repo hygiene.** Keep raw Apify outputs and lead CSVs out of git from the start, with a `.gitignore` entry before the first run, since history can't be cleaned reliably once pushed.

## Sources

**Primary law and case law**
- GDPR, official text: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- GDPR Art. 9: https://gdpr-info.eu/art-9-gdpr/
- GDPR Art. 14: https://gdpr-info.eu/art-14-gdpr/
- GDPR Art. 21: https://gdpr-info.eu/art-21-gdpr/
- CJEU C-101/01 Lindqvist (FRA summary): https://fra.europa.eu/sk/caselaw-reference/cjeu-case-c-10101-judgment
- Lindqvist (Wikipedia summary): https://en.wikipedia.org/wiki/Bodil_Lindqvist_v_%C3%85klagarkammaren_i_J%C3%B6nk%C3%B6ping
- CJEU C-621/22 KNLTB: https://www.bailii.org/eu/cases/EUECJ/2024/C62122.html
- KNLTB commentary (A&O Shearman): https://www.aoshearman.com/en/insights/ao-shearman-on-data/cjeu-commercial-interests-of-controller-can-serve-as-a-legitimate-interest
- Czech Act 480/2004 Sb.: https://www.zakonyprolidi.cz/cs/2004-480
- Czech Civil Code §§ 84 to 90: https://www.podnikatel.cz/zakony/novy-obcansky-zakonik/zneni-20210101/f4579114/

**Regulators**
- EDPB Guidelines 1/2024 on Art. 6(1)(f), v1.0, 8 Oct 2024: https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf
- CNIL, KASPR decision (EN): https://www.cnil.fr/en/data-scraping-kaspr-fined-eu200000
- CNIL, KASPR decision (FR): https://cnil.fr/fr/aspiration-de-donnees-sanction-de-240-000-euros-lencontre-de-la-societe-kaspr
- EDPB news on KASPR: https://www.edpb.europa.eu/news/news/2025/data-scraping-french-supervisory-authority-fined-kaspr-eu240-000_da
- CNIL, reconstructing professional email addresses (16 Oct 2026): https://cnil.fr/fr/node/169044
- CNIL, rights page for the same: https://cnil.fr/fr/node/169047
- CNIL, web-scraping focus sheet (5 Jan 2026): https://www.cnil.fr/en/legal-basis-legitimate-interests-focus-sheet-measures-implement-case-data-collection-web-scraping
- CNIL, 2009 B2B email rules: https://www.cnil.fr/fr/node/84701
- CNIL electronic communication rules, via Leto (Jun 2026): https://www.leto.legal/news/cnil-communications-electroniques-prospection-regles-2026
- UODO, Bisnode Supreme Administrative Court ruling: https://uodo.gov.pl/en/553/1572
- OAIC, 2023 joint statement on scraping: https://www.oaic.gov.au/news/media-centre/global-expectations-of-social-media-platforms-and-other-sites-to-safeguard-against-unlawful-data-scraping
- FDPIC, 2024 concluding statement: https://edoeb.admin.ch/en/31102024-concluding-statement-on-data-scraping
- OPC Canada, 2024 news release: https://priv.gc.ca/en/opc-news/news-and-announcements/2024/nr-c_241028/
- ICO, key concepts for electronic mail (search snippet only): https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/key-concepts-for-direct-marketing-using-electronic-mail/
- Dutch AP guidance, privacy-web.nl summary: https://privacy-web.nl/en/nieuws/ap-scraping-bijna-altijd-illegaal/
- Dutch AP guidance, Morgan Lewis summary: https://www.morganlewis.com/pubs/2024/05/eu-regulator-adopts-restrictive-gdpr-position-on-data-scraping-impacting-ai-technologies

**Czech commentary and legislative status**
- epravo.cz on commercial communications and GDPR: https://www.epravo.cz/top/clanky/rozesilani-obchodnich-sdeleni-a-gdpr-112733.html
- pravniprostor.cz on spam fines: https://www.pravniprostor.cz/clanky/pravo-it/za-spam-padaji-milionove-pokuty-znate-vsechna-pravidla
- pravniprostor.cz on likeness and photos: https://pravniprostor.cz/clanky/obcanske-pravo/podminky-zachyceni-sireni-podoby-cloveka-prostrednictvim-fotografie
- PSP stenoprotocol, first reading of the digital economy bill: https://psp.cz/eknih/2025ps/stenprot/010schuz/bqbs/b14700801.htm
- Lupa on government approval of the bill: https://www.lupa.cz/aktuality/vlada-po-mnoha-peripetiich-schvalila-navrh-zakona-o-digitalni-ekonomice/

**LinkedIn**
- User Agreement (effective 3 Nov 2025): https://www.linkedin.com/legal/user-agreement
- Professional Community Policies: https://www.linkedin.com/legal/professional-community-policies
- Prohibited software and extensions: https://www.linkedin.com/help/linkedin/answer/a1341387
- LinkedIn news, Proxycurl lawsuit: https://news.linkedin.com/2025/linkedin-takes-legal-action-to-defend-member-privacy
- LinkedIn news, Proxycurl outcome: https://news.linkedin.com/2025/LinkedInWinsLegalBattleToProtectMemberData
- Bloomberg Law on ProAPIs: https://news.bloomberglaw.com/ip-law/linkedin-battles-online-scrapers-in-perpetual-struggle-over-data
- National Law Review on hiQ: https://www.natlawreview.com/article/linkedin-s-data-scraping-battle-hiq-labs-ends-proposed-judgment
- Proskauer on hiQ: https://www.proskauer.com/blog/hiq-and-linkedin-reach-proposed-settlement-in-landmark-scraping-case
- Farella Braun + Martel on Meta v. Bright Data: https://www.fbm.com/technology/publications/major-decision-affects-law-of-scraping-and-online-data-collection-meta-platforms-v-bright-data/

**Tools (secondary, vendor)**
- Surfe on Sales Navigator export: https://surfe.com/blog/how-to-export-sales-navigator-lists-to-a-csv-file
- FullEnrich on Sales Navigator export: https://fullenrich.com/content/how-to-export-list-from-linkedin-sales-navigator
- GetSales blog on LinkedIn automation: https://getsales.io/blog/how-to-automate-messages-on-linkedin/
