# Telco CVM: workflow copy

Status: draft, **needs a native read** (Czech and German above all).

ICP: telco, pay-TV and streaming operators, for customer value management and digital sales. Czech, German and English × signal, problem and proof: 9 workflows. These are Addvery's messages to Addvery's prospects, sent by an Addvery person.

## How every workflow runs

| Step | When | Text |
| --- | --- | --- |
| Message 1 | 1 day after they accept, or at once if already connected | the lead's custom message 1, written before import to the brief below |
| Follow-up 1 | 3 days later | fixed text below |
| Follow-up 2 | 3 days after that | fixed text below: the last touch, with an easy way out |

Any reply stops the sequence.

## Conventions

- Message 1 opens with a greeting and carries no signature; the follow-ups sign off with `{{sender_first_name}}`.
- Czech greets without a name ("Dobrý den,"). `{{first_name}}` would land in the nominative, where Czech needs the vocative ("Petře", not "Petr"). `{{company_name}}` sits after "ve společnosti" or "pro", so it never has to decline.
- German opens with "Hallo {{first_name}}," and uses Sie throughout, as in the retail copy. `{{company_name}}` follows "bei" or "für", so it never has to decline.
- Formal address throughout (vykání, Sie). No gendered first-person past tense in Czech: Addvery speaks as "we" ("jsme pomohli", "jsme namodelovali"), the sender only in the present ("ozývám se", "tomu rozumím").
- There is no Slovak copy: Slovak leads get the Czech workflows.
- The light ask is 20 minutes or "worth a look?"; every Follow-up 2 ends with an easy no.

## Proof used, as Addvery's site states it

- **Vodafone CZ, CVM and digital health check:** "14 workshops with 16 Vodafone stakeholders" from the CVM and Online teams, ending in seven costed initiatives in one roadmap; "Up to +1,660 orders/month in total, net of overlap", all **modelled**. The problem it started from: "most orders were still completed with a call-centre agent".
- **Vodafone CZ, online sales funnel:** data from every system connected into one funnel, "6 funnel stages" from first campaign to activation, "1 shared source of truth". No numbers are claimed.
- **Oneplay:** two Czech media groups merged their streaming services; "1.8M customers moved"; one team across "10+ departments"; three rounds of pricing tests; "Launched on 3 March 2025, as planned".

Message 1 names clients by type only; the follow-ups name them. Leads at Vodafone CZ or Oneplay are the clients in these stories: route them by hand, not into these workflows.

## Czech (CS)

### Demo · Telco CVM · CS · signal

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Czech. Start with 'Dobrý den,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on the lead's one dated public trigger from the last 90 days (a new commercial, CVM or online-sales role; CVM or digital-sales hiring; a bundle or streaming launch; a brand merger; a CRM replacement): name it plainly, say in one sentence why that moment matters for turning online interest into orders, and end on one short question. Don't pitch Addvery, cite numbers or clients, ask for a meeting, or use anything private. Use formal vykání, and no gendered first-person past tense ('viděl/a jsem') or 'rád/a'.

**Message 1 example** (267 characters). Fictional lead: new Head of Online Sales at Relecloud Mobil (CZ mobile operator), in the role for six weeks.

```text
Dobrý den, gratuluji k nové pozici v čele online prodeje ve společnosti Relecloud Mobil. Prvních pár měsíců v takové roli je nejlepší chvíle zjistit, kolik zájmu o tarify z webu nakonec dotáhne až call centrum a kde se cestou ztrácí. Vidíte to dnes v jednom přehledu?
```

**Follow-up 1** (3 days later, 444 characters)

```text
Dobrý den,

ještě k tomu, co se teď ve společnosti {{company_name}} mění. Nová role, nová nabídka nebo spojení značek je chvíle, kdy se dá prodejní trychtýř nastavit znovu, dřív než se usadí staré zvyky. Pro Vodafone CZ jsme po 14 workshopech se 16 lidmi z CVM a online prodeje namodelovali až 1 660 objednávek měsíčně navíc, v trychtýři, který už měli. Má smysl si na to dát 20 minut a projít, kde by to mohlo být u vás?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 331 characters)

```text
Dobrý den,

ozývám se naposledy. Po velké změně bývá kalendář plný, tomu rozumím. Jen jedna poznámka: s tím, co se v trychtýři nastaví v prvních měsících, se pak pracuje roky. Pokud by se hodil pohled zvenku, stačí odpovědět a najdeme 20 minut. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat.

{{sender_first_name}}
```

### Demo · Telco CVM · CS · problem

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Czech. Start with 'Dobrý den,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on one problem this ICP has, in the buyer's own terms (plenty of data but no single funnel from campaign to activation; online interest that still ends with a call-centre agent; viewers who don't want several apps), tied to one public fact about the company, such as selling online, in stores and by phone, or running several brands. End on one short question about how they handle it today. Don't pitch, cite numbers or clients, or guess at their internal results. Use formal vykání, and no gendered first-person past tense ('viděl/a jsem') or 'rád/a'.

**Message 1 example** (223 characters). Fictional lead: Director of CVM at Trey Telekom (CZ operator, mobile and home internet), no recent trigger.

```text
Dobrý den, Trey Telekom prodává tarify i domácí internet na webu, v prodejnách i přes call centrum. Při takovém nastavení má obvykle každý tým svoje čísla, ale jeden pohled od kampaně po aktivaci chybí. Jak to máte dnes vy?
```

**Follow-up 1** (3 days later, 456 characters)

```text
Dobrý den,

operátoři to většinou řeší dalším dashboardem nebo dalším nástrojem. Dat pak přibývá, ale odpověď na otázku, kde se ztrácejí objednávky, pořád chybí. My začínáme jinde: data ze všech systémů propojíme do jednoho trychtýře, od první kampaně po aktivaci. Pro Vodafone CZ to znamenalo šest fází trychtýře a jeden společný zdroj pravdy. Dávalo by smysl probrat za 20 minut, jak by to vypadalo ve společnosti {{company_name}}?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 390 characters)

```text
Dobrý den,

ozývám se naposledy, tak jen jedna otázka na zamyšlení: kolik objednávek, které začnou na webu, nakonec dotáhne call centrum? A víte, v kterém kroku se zákazník rozhodne zavolat? Pokud odpověď není po ruce, právě tam se často schovávají objednávky navíc. Rádi to s vámi projdeme za 20 minut. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat.

{{sender_first_name}}
```

### Demo · Telco CVM · CS · proof

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Czech. Start with 'Dobrý den,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on the closest look-alike result, worded as Addvery's site has it: for a mobile, fixed or convergent operator, up to 1,660 extra orders a month (modelled) found in a telco's existing funnel; for streaming or pay-TV, 1.8 million customers moved to one new platform on the planned date, when two Czech media groups merged their streaming services. Describe the client by type, not name, add one clause on what it could mean for the lead's company, and end with 'Stálo by to za pohled?'. Never drop 'up to' or 'modelled', round up, or promise the lead the same result. Use formal vykání, and no gendered first-person past tense ('viděl/a jsem') or 'rád/a'.

**Message 1 example** (288 characters). Fictional lead: Head of Subscriptions at Southridge Video (CZ streaming service), which runs two apps.

```text
Dobrý den, pomohli jsme dvěma českým mediálním skupinám spojit jejich streamovací služby a převést 1,8 milionu zákazníků na jednu platformu, a to v plánovaném termínu. Pokud Southridge Video chystá novou platformu, to, co fungovalo tam, by mohlo ubrat riziko i vám. Stálo by to za pohled?
```

**Follow-up 1** (3 days later, 474 characters)

```text
Dobrý den,

krátce jeden příběh z telekomunikací. Ve Vodafone CZ se většina objednávek pořád dokončovala přes call centrum. Za 14 workshopů se 16 lidmi z CVM a online prodeje vzniklo sedm iniciativ s vyčíslenými náklady v jedné roadmapě a model ukázal až 1 660 objednávek měsíčně navíc, po odečtení překryvů. Pro {{company_name}} by to byl stejný pohled: kolik objednávek už ve vašem trychtýři leží a kolik by stálo je získat. Stálo by to za 20 minut?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 454 characters)

```text
Dobrý den,

ještě jeden příběh, tentokrát ze streamingu. Dvě české mediální skupiny spojily své streamovací služby do Oneplay a 1,8 milionu zákazníků bylo potřeba převést k veřejně ohlášenému datu. Jeden tým napříč 10+ odděleními, tři kola cenových testů a start 3. března 2025, podle plánu. Pokud {{company_name}} čeká podobný krok, rádi ukážeme, jak jsme na to šli. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat.

{{sender_first_name}}
```

## German (DE)

### Demo · Telco CVM · DE · signal

**Message 1 brief** (for the LLM that writes custom message 1)

Write in German with formal Sie. Start with 'Hallo' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on the lead's one dated public trigger from the last 90 days (a new commercial, CVM or online-sales role; CVM or digital-sales hiring; a bundle or streaming launch; a brand merger; a CRM replacement): name it plainly, say in one sentence why that moment matters for turning online interest into orders, and end on one short question. Don't pitch Addvery, cite numbers or clients, ask for a meeting, or use anything private.

**Message 1 example** (321 characters). Fictional lead: Katrin, Head of Digital Sales at Litware Telekom AT (Austrian operator), which launched a mobile, internet and TV bundle four weeks ago.

```text
Hallo Katrin, Litware Telekom hat vor vier Wochen ein Paket aus Mobilfunk, Internet und TV gestartet. Bei einem neuen Paket zeigt sich schnell, wie viel Interesse aus dem Web wirklich zur Bestellung wird und wie viel doch im Callcenter landet. Sehen Sie das heute in einer Übersicht, von der Kampagne bis zur Aktivierung?
```

**Follow-up 1** (3 days later, 530 characters)

```text
Hallo {{first_name}},

noch ein Gedanke dazu, was sich bei {{company_name}} gerade verändert. Eine neue Rolle, ein neues Paket oder eine Fusion öffnet ein kurzes Zeitfenster, um den Vertriebsfunnel neu aufzusetzen, bevor sich alte Routinen einschleifen. Bei Vodafone CZ haben wir nach 14 Workshops mit 16 Beteiligten aus CVM und Online-Vertrieb bis zu 1.660 zusätzliche Bestellungen pro Monat modelliert, im Funnel, den es dort schon gab. Lohnen sich 20 Minuten, um zu sehen, wo das bei Ihnen liegen könnte?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 439 characters)

```text
Hallo {{first_name}},

das ist meine letzte Nachricht. Nach einer großen Veränderung ist der Kalender voll, das verstehe ich. Nur ein Gedanke: Womit das Team die nächsten Jahre arbeitet, wird oft in den ersten Monaten im Funnel festgelegt. Wenn ein Blick von außen hilft, genügt eine kurze Antwort, und wir finden 20 Minuten. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr.

{{sender_first_name}}
```

### Demo · Telco CVM · DE · problem

**Message 1 brief** (for the LLM that writes custom message 1)

Write in German with formal Sie. Start with 'Hallo' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on one problem this ICP has, in the buyer's own terms (plenty of data but no single funnel from campaign to activation; online interest that still ends with a call-centre agent; viewers who don't want several apps), tied to one public fact about the company, such as selling online, in stores and by phone, or running several brands. End on one short question about how they handle it today. Don't pitch, cite numbers or clients, or guess at their internal results.

**Message 1 example** (274 characters). Fictional lead: Stefan, Head of CVM at Wide World Kabel (Austrian cable, internet and TV provider), no recent trigger.

```text
Hallo Stefan, Wide World Kabel verkauft Internet und TV online, in Shops und über das Callcenter. In so einem Setup hat meist jedes Team seine eigenen Zahlen, aber niemand sieht einen durchgehenden Funnel von der ersten Kampagne bis zur Aktivierung. Wie lösen Sie das heute?
```

**Follow-up 1** (3 days later, 515 characters)

```text
Hallo {{first_name}},

die meisten Betreiber reagieren darauf mit noch einem Dashboard oder noch einem Tool. Die Daten werden mehr, aber die Frage, wo Bestellungen verloren gehen, bleibt offen. Wir setzen woanders an: Wir verbinden die Daten aus allen Systemen zu einem Funnel, von der ersten Kampagne bis zur Aktivierung. Bei Vodafone CZ waren das sechs Funnel-Stufen und eine gemeinsame Datenbasis. Lohnt sich ein 20-minütiges Gespräch darüber, wie das bei {{company_name}} aussehen könnte?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 488 characters)

```text
Hallo {{first_name}},

zum Schluss nur eine Frage zum Nachdenken: Wie viele Bestellungen, die auf Ihrer Website beginnen, werden am Ende im Callcenter abgeschlossen? Und wissen Sie, bei welchem Schritt Kunden zum Telefon greifen? Wenn die Antwort nicht gleich parat ist, stecken genau dort oft die zusätzlichen Bestellungen. Gern gehen wir das in 20 Minuten mit Ihnen durch. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr.

{{sender_first_name}}
```

### Demo · Telco CVM · DE · proof

**Message 1 brief** (for the LLM that writes custom message 1)

Write in German with formal Sie. Start with 'Hallo' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on the closest look-alike result, worded as Addvery's site has it: for a mobile, fixed or convergent operator, up to 1,660 extra orders a month (modelled) found in a telco's existing funnel; for streaming or pay-TV, 1.8 million customers moved to one new platform on the planned date, when two Czech media groups merged their streaming services. Describe the client by type, not name, add one clause on what it could mean for the lead's company, and end with 'Einen Blick wert?'. Never drop 'up to' or 'modelled' ('bis zu', 'modelliert'), round up, or promise the lead the same result.

**Message 1 example** (316 characters). Fictional lead: Jonas, Commercial Director at Adatum Mobilfunk (German mobile operator), selling online and by phone.

```text
Hallo Jonas, für einen tschechischen Telekommunikationsanbieter haben wir im bestehenden Vertriebsfunnel bis zu 1.660 zusätzliche Bestellungen pro Monat modelliert. Adatum Mobilfunk verkauft ebenfalls online und über das Callcenter, eine ähnliche Analyse könnte also auch bei Ihnen Reserven zeigen. Einen Blick wert?
```

**Follow-up 1** (3 days later, 545 characters)

```text
Hallo {{first_name}},

kurz eine Geschichte aus der Telekommunikation. Bei Vodafone CZ liefen die meisten Bestellungen noch über das Callcenter. In 14 Workshops mit 16 Beteiligten aus CVM und Online-Vertrieb entstanden daraus sieben Initiativen mit bezifferten Kosten in einer Roadmap, und das Modell zeigte bis zu 1.660 zusätzliche Bestellungen pro Monat, bereinigt um Überschneidungen. Für {{company_name}} hieße das: Wie viele Bestellungen liegen schon in Ihrem Funnel, und was kostet es, sie zu holen? 20 Minuten wert?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 537 characters)

```text
Hallo {{first_name}},

noch eine Geschichte, diesmal aus dem Streaming. Zwei tschechische Mediengruppen haben ihre Streamingdienste zu Oneplay zusammengelegt, und 1,8 Mio. Kunden mussten zu einem öffentlich angekündigten Termin umziehen. Ein Team aus 10+ Abteilungen, drei Runden Preistests, Start am 3. März 2025, wie geplant. Steht bei {{company_name}} ein ähnlicher Schritt an, zeigen wir gern, wie wir vorgegangen sind. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr.

{{sender_first_name}}
```

## English (EN)

### Demo · Telco CVM · EN · signal

**Message 1 brief** (for the LLM that writes custom message 1)

Write in English. Start with 'Hi' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on the lead's one dated public trigger from the last 90 days (a new commercial, CVM or online-sales role; CVM or digital-sales hiring; a bundle or streaming launch; a brand merger; a CRM replacement): name it plainly, say in one sentence why that moment matters for turning online interest into orders, and end on one short question. Don't pitch Addvery, cite numbers or clients, ask for a meeting, or use anything private.

**Message 1 example** (228 characters). Fictional lead: Group Commercial Director at Northwind Telecom Group (regional CEE operator), which posted a Head of CVM role three weeks ago.

```text
Hi Dana, I see Northwind Telecom Group is hiring a Head of CVM. A new CVM lead often inherits plenty of data and many answers, but no single funnel from campaign to activation. Is that something you want fixed before they start?
```

**Follow-up 1** (3 days later, 422 characters)

```text
Hi {{first_name}},

one more thought on what's changing at {{company_name}}. A new role, a new bundle or a merger opens a short window to reset the sales funnel before old habits set in. At Vodafone CZ, after 14 workshops with 16 people from CVM and online sales, we modelled up to 1,660 extra orders a month, inside the funnel they already had. Worth 20 minutes to see where that might sit for you?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 342 characters)

```text
Hi {{first_name}},

last note from me. After a big change the calendar fills up, I get that. One thought: whatever gets set up in the funnel in the first months is what the team lives with for years. If an outside view would help, just reply and we'll find 20 minutes. If it's not a priority, just say so and I'll stop.

{{sender_first_name}}
```

### Demo · Telco CVM · EN · problem

**Message 1 brief** (for the LLM that writes custom message 1)

Write in English. Start with 'Hi' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on one problem this ICP has, in the buyer's own terms (plenty of data but no single funnel from campaign to activation; online interest that still ends with a call-centre agent; viewers who don't want several apps), tied to one public fact about the company, such as selling online, in stores and by phone, or running several brands. End on one short question about how they handle it today. Don't pitch, cite numbers or clients, or guess at their internal results.

**Message 1 example** (237 characters). Fictional lead: Head of Digital Sales at Proseware Mobile (operator in several CEE markets), no recent trigger.

```text
Hi Tomas, Proseware Mobile sells plans online, in stores and through a call centre. In a set-up like that, each team usually has its own numbers, and nobody sees one funnel from first campaign to activation. How do you handle that today?
```

**Follow-up 1** (3 days later, 449 characters)

```text
Hi {{first_name}},

most operators answer this with another dashboard or another tool. The data grows, but the question of where orders get lost stays open. We start somewhere else: we connect the data from every system into one funnel, from first campaign to activation. For Vodafone CZ, that meant six funnel stages and one shared source of truth. Would 20 minutes on what that could look like at {{company_name}} be useful?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 392 characters)

```text
Hi {{first_name}},

last note, so just one question to sit with: how many orders that start on your website end up closed by the call centre? And do you know at which step people decide to pick up the phone? If the answer isn't to hand, that's often where the extra orders hide. Happy to walk through it in 20 minutes. If it's not a priority, just say so and I'll stop.

{{sender_first_name}}
```

### Demo · Telco CVM · EN · proof

**Message 1 brief** (for the LLM that writes custom message 1)

Write in English. Start with 'Hi' and the lead's first name, then 2–3 short sentences, under 400 characters in all. Rest it on the closest look-alike result, worded as Addvery's site has it: for a mobile, fixed or convergent operator, up to 1,660 extra orders a month (modelled) found in a telco's existing funnel; for streaming or pay-TV, 1.8 million customers moved to one new platform on the planned date, when two Czech media groups merged their streaming services. Describe the client by type, not name, add one clause on what it could mean for the lead's company, and end with 'Worth a look?'. Never drop 'up to' or 'modelled', round up, or promise the lead the same result.

**Message 1 example** (275 characters). Fictional lead: Chief Product Officer at VanArsdel Media Group (CEE pay-TV and streaming group), which runs several apps.

```text
Hi Marta, we helped two Czech media groups merge their streaming services and move 1.8 million customers to one platform, on the planned date. If VanArsdel Media Group is bringing its apps under one roof, what worked there could take some risk out of your move. Worth a look?
```

**Follow-up 1** (3 days later, 482 characters)

```text
Hi {{first_name}},

a short story from telecoms. At Vodafone CZ, most orders were still completed with a call-centre agent. Over 14 workshops with 16 people from CVM and online sales, we turned that into seven costed initiatives in one roadmap, and the model showed up to 1,660 extra orders a month, net of overlap. For {{company_name}}, it would mean the same view: how many orders already sit in your funnel, and what it costs to win them. Worth 20 minutes?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 443 characters)

```text
Hi {{first_name}},

one more story, this time from streaming. Two Czech media groups merged their streaming services into Oneplay, and 1.8 million customers had to move by a public date. One team across 10+ departments, three rounds of pricing tests, and a launch on 3 March 2025, as planned. If {{company_name}} has a move like that ahead, happy to show how we ran it. If it's not a priority, just say so and I'll stop.

{{sender_first_name}}
```
