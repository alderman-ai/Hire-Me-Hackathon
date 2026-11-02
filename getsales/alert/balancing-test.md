# Legitimate-interest balancing test

**Draft for Alex: his to adopt, not legal advice.**

- **Date:** 2 November 2026
- **Controller:** Alex Alderman, an individual, Prague
- **People concerned:** six senior people at Addvery, identified by role
- **Processing:** researching them from public sources (LinkedIn, Addvery's website, Apify scraping) and sending each, through GetSales, a short LinkedIn alert about a live, recorded job-application build.
- **Scope:** the research and the messages only. Publishing anything about the six (site, recording, repo) is a separate purpose that would need its own test.

## 1. Purpose test: is there a legitimate interest?

Yes. Alex wants to work with Addvery as a GTM engineer and to reach the people who would judge the work. Seeking work is a lawful, real and present interest; the CJEU accepts even commercial interests as legitimate (*KNLTB*, C-621/22, 2024). The message is a job application, not a services offer, which arguably keeps it outside the Czech consent rule for commercial communications (Act 480/2004, § 7).

## 2. Necessity test: is the processing needed, and is it the least intrusive way?

- Applying to specific people means knowing who they are and how to reach them: name, role, employer, LinkedIn profile URL.
- One personalised opening line shows the application fits their role. That needs a little public professional information, nothing more.
- Not collected: email addresses (real or guessed), phone numbers, photos, career history, personality profiles, special-category data, connections-only content.
- A generic application wouldn't reach the people who decide. The group stays at six.

## 3. Balancing test: do their interests override Alex's?

- **For:** a genuine, one-off job application; six people; professional data they made public; a professional channel; no profiling.
- **Against:** they didn't ask to be contacted; some data was scraped, which LinkedIn's terms object to; sending is automated; the build is recorded in public.
- **Reasonable expectations:** senior people on a professional network can expect approaches about jobs; their position is a relevant factor (EDPB Guidelines 1/2024, para 54). They wouldn't expect their details or replies to be published, so they won't be.
- **Impact:** low. A few short messages, a hard stop, a one-word opt-out.

**Result:** with the safeguards below, their interests don't override Alex's.

## 4. Safeguards

1. **Notice:** the first communication links to the privacy page (who, why, legal basis, data, sources, processors, retention, rights, complaints to ÚOOÚ).
2. **Objection:** the first communication states the right to object in its own sentence. "No" or "stop" stops the sequence and deletes the data, keeping only a do-not-contact note.
3. **Minimal data in GetSales:** name, title, company, profile URL, the one opening line.
4. **Hard stop:** a connection note and at most three short messages; nothing after an objection or the last message.
5. **Retention:** everything deleted by 31 December 2026 unless a conversation continues (date for Alex to confirm).
6. **Kept private:** nothing about the six, their replies or their GetSales status on the site, in the recording or in the repo; raw scraped data stays out of git.
7. **Low automation:** human-paced sending; no cookie-based scrapers on Alex's account.

## 5. Outcome

Legitimate interest (GDPR Art. 6(1)(f)) is an appropriate basis for the research and the alert, provided all seven safeguards are in place before the first message goes. Redo this test if the message becomes a services offer, if any of the six has restricted their profile, or before anything about them is published.

Adopted by: ____________ Date: ____________
