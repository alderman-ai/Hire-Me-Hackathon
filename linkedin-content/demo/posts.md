# LinkedIn posts in Addvery's voice

Five posts written in Addvery's company voice ("we") from public sources, by an AI writer under Alex's direction, and scored blind by a separate AI judge against 21 voice rules. Three text posts and two 8-slide document carousels. Nothing here was posted to LinkedIn. No real person or client is named, and every number is illustrative, framed as how such projects usually go.

Status: final text. Alex's brand sign-off is pending on his Claude Doc; any edits he makes follow as a second site request.

Score label, the same for all five: "Meets 21 of 21 voice rules, 0 AI tells". AI tells are stock AI phrasings, counted by a script, plus the judge's check for a generic AI-essay register. The score shows the posts follow the rules, not proof that they sound like Addvery to Addvery.

Slide images for the two carousels: `slides/post-2/` and `slides/post-4/` in this folder, 540 x 675 WebP, with each slide's alt text (its exact copy) in `alt.json` beside them. They carry Addvery's logo and brand assets, so they're git-ignored like the site's brand kit: read them from disk.

---

## Post 1: Why AI pilots stall before production

Format: Text post  
Score: Meets 21 of 21 voice rules, 0 AI tells (blind judge's tier: Great)

The generic post in `baseline.md` is on the same topic: show it beside this one.

```text
Production invoices arrive as phone photos, some with a thumb over the total.

The pilot never saw one. So before the next build, we ask for this:

1. What did last month's inbox look like, unsorted?
The demo runs on hand-picked PDFs, and the model reads every one. The real inbox has scans at an angle and credit notes. It has a supplier who changed their template in March, and three invoices in one email. We ask for that month, as it arrived.

2. Whose name is on the exception queue?
Everything the model can't read lands there. Finance thinks IT owns it. IT thinks the vendor does. The vendor's contract ended with the pilot. We want one name, for the queue and for keeping it running after we leave.

3. What can it cost per month and still pay back?
The pilot budget covers the build. Production adds API calls, hosting and about 20 hours a month of someone fixing misreads. Leave those out, and a business case that promised payback in 8 months can land nearer 3 years.

On a typical invoice project, the model is the smallest line on that monthly bill.
```

---

## Post 2: Fix the data before the model

Format: Document carousel, 8 slides  
Score: Meets 21 of 21 voice rules, 0 AI tells (blind judge's tier: Great)

### Caption

```text
The CRM says 12,000 active customers. Finance invoiced 7,400 last year.

That gap decides the project. The slides show where it hides.

Your numbers will differ. The gap is usually there: duplicates, accounts that went quiet years ago, a second customer list in someone's Excel file.

An AI model built on that list treats every duplicate as a real customer.

So for two weeks, nobody builds. That costs less than a pilot that misses its launch date by a quarter. And if the project isn't worth building, you learn that before the budget is spent.
```

### Slides (images in `slides/post-2/`)

```text
SLIDE 1: One customer. Four records. Three spellings of the company name.

Fix the data before the model. Swipe before anyone builds anything.

SLIDE 2: Garbage in, garbage out.
A model built on that list sees four customers with four credit limits.
So for two weeks, nobody builds. We read the data.

SLIDE 3: 1. Where does the data really live?
Officially, the CRM. In practice, often a spreadsheet that sales exports every week.
Find every copy. Ask which one people trust.

SLIDE 4: 2. Who owns each field?
Put an owner's name next to every field the project needs.
If nobody owns payment terms, three systems disagree. The model learns all three.

SLIDE 5: 3. How many records are duplicates or stale?
Count them. Don't estimate.
In a ten-year-old CRM, one in five isn't unusual. Merge or archive them before the pilot, not after.

SLIDE 6: 4. What are the exceptions?
Ask what people still do by hand. The key account with its own prices. The order that skips approval.
Automation breaks there first.

SLIDE 7: Two weeks of picking the real spelling of a company name: the least photogenic part of the project.
Cheaper than a pilot that launches a quarter late on bad data.

SLIDE 8: How many of your customer records are duplicates?
Most companies we meet can only guess. The model will treat the guess as fact.
```

---

## Post 3: The launch date, not the deck

Format: Text post  
Score: Meets 21 of 21 voice rules, 0 AI tells (blind judge's tier: Great)

```text
Twelve weeks into most strategy projects, the launch date still says "Q3, TBC".

We write a three-line page before any slides. Open the post to see it.

We fill it in during the first two weeks of a strategy project.

1. The number: one figure the business already reports, like days to close the month.
2. The date: the day something goes live for real users.
3. The owner: one name inside the company who answers for that date.

Agreeing the number tends to take an hour. The owner line takes longest, because a name next to a date is a real commitment.

We've typed "Q3, TBC" onto slides ourselves. More than once.

The analysis still happens after that. It works backwards from the three lines. A finding that can't move the number by the date goes on the "later" list.
```

---

## Post 4: What not to hand to AI yet

Format: Document carousel, 8 slides  
Score: Meets 21 of 21 voice rules, 0 AI tells (blind judge's tier: Great)

The judge's first pick in the set for stopping a busy COO mid-scroll.

### Caption

```text
A customer wants 4,800 CZK back. The model has already said yes.

Who signs it? Our answer is further down.

In most pilots, someone reads every suggestion before a customer sees it. That person is your governance. In production, they're gone.

Before go-live, we ask four questions. Who signs off a refund? Who checked the data the model reads? Who fixes a wrong answer? Could you explain the decision to an auditor? Auditors, it turns out, don't count "94% confident" as a signature.

Where the answer is "nobody", that part stays with people for now. One wrong refund rule, repeated a few hundred times, can cost more margin than the pilot saved.

The rest goes to the model gladly: tagging complaints, matching them to orders, reading delivery notes. It's dull and checkable, which is where the hours come back. Start there.
```

### Slides (images in `slides/post-4/`)

```text
SLIDE 1: A customer wants 4,800 CZK back. The model has already said yes.

Who signs it? Our answer starts on the next slide.

SLIDE 2: Not yet: decisions with legal or customer impact and no human sign-off.
Refunds, credit limits, contract terms. The model can draft them. A named person signs.

SLIDE 3: Not yet: data nobody has checked.
Complaint codes that changed meaning last spring? The model reads old and new as one.
One wrong reading, repeated thousands of times a month.

SLIDE 4: Not yet: processes nobody owns.
If nobody can name who fixes a wrong answer on Friday at 4 pm, the process isn't ready.
Name the owner before go-live.

SLIDE 5: Not yet: anything you can't explain to an auditor.
Which input, which model version, who approved it.
If the log can't show all three, a person stays in the loop.

SLIDE 6: Hand over gladly: the boring, repetitive, checkable work.
Tagging complaints. Matching them to orders. Pulling order numbers off scanned delivery notes.
A person checks each one in seconds.

SLIDE 7: Why start there: a person can check it, so errors surface the same day.
On a flow like this, that can be 30 to 40 hours a month.

SLIDE 8: Two columns for every pilot task: "checkable in seconds" and "needs a signature".
Go live with the first column.
The second waits for an owner, clean data and a log.
```

---

## Post 5: The spreadsheet that runs the company

Format: Text post  
Score: Meets 21 of 21 voice rules, 0 AI tells (blind judge's tier: Great)

```text
Pricing_final_v7_use-this-one.xlsx. One person in the company understands it.

We don't start by replacing it. Read on for what we do instead.

Almost every scale-up we meet has a file like it. It runs pricing, the production plan or the month-end close. It started as a quick fix. Now the business can't close a quarter without it.

1. Map what it really decides.
Not the tab names. The cells that set a price, a delivery date, a bonus. Usually three or four tabs decide. The rest copy them.

2. Find the person who knows the exceptions.
We sit with them for a day, because none of it is written down. The distributor who always gets 4% off. The macro you run twice in December. The orange cells. (We have yet to meet one that was safe to touch.)

3. Replace the riskiest part first. Not all of it.
Usually it's the tab where one wrong cell changes the margin on every quote. That tab moves into a proper system with an owner and a log. The rest stays in Excel for now.

A full rebuild usually takes a year and still misses the exceptions. One tab moves in weeks. Quotes carry the right margin from then on.

Pricing_final_v7_use-this-one.xlsx is still there. It no longer sets the margin.
```
