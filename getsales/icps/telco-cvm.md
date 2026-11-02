# Telco CVM: workflow copy

Status: draft, **needs a native read** (Czech and Slovak above all).

ICP: telco, pay-TV and streaming operators, for customer value management and digital sales. Czech, Slovak and English × signal, problem and proof: 9 workflows. These are Addvery's messages to Addvery's prospects, sent by an Addvery person.

## How every workflow runs

| Step | When | Text |
| --- | --- | --- |
| Message 1 | 1 day after they accept, or at once if already connected | the lead's custom message 1, written before import to the brief below |
| Follow-up 1 | 3 days later | fixed text below |
| Follow-up 2 | 3 days after that | fixed text below: the last touch, with an easy way out |

Any reply stops the sequence.

## Conventions

- Message 1 opens with a greeting and carries no signature; the follow-ups sign off with `{{sender_first_name}}`.
- Czech and Slovak greet without a name ("Dobrý den," / "Dobrý deň,"). `{{first_name}}` would land in the nominative, where Czech needs the vocative ("Petře", not "Petr"). `{{company_name}}` sits after "ve společnosti" / "v spoločnosti" or "pro" / "pre", so it never has to decline.
- Formal address throughout (vykání, vykanie). No gendered first-person past tense: Addvery speaks as "we" ("jsme pomohli", "sme namodelovali"), the sender only in the present ("ozývám se", "tomu rozumím").
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

## Slovak (SK)

### Demo · Telco CVM · SK · signal

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Slovak. Start with 'Dobrý deň,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on the lead's one dated public trigger from the last 90 days (a new commercial, CVM or online-sales role; CVM or digital-sales hiring; a bundle or streaming launch; a brand merger; a CRM replacement): name it plainly, say in one sentence why that moment matters for turning online interest into orders, and end on one short question. Don't pitch Addvery, cite numbers or clients, ask for a meeting, or use anything private. Use formal vykanie, and no gendered first-person past tense ('videl/a som') or 'rád/rada'.

**Message 1 example** (253 characters). Fictional lead: Head of Digital Sales at Tailwind Mobil (SK operator), which launched a mobile, internet and TV bundle four weeks ago.

```text
Dobrý deň, spoločnosť Tailwind Mobil práve spustila balík mobilu, internetu a televízie. Pri novom balíku sa ukáže, koľko záujmu z webu sa naozaj zmení na objednávky a koľko skončí v call centre. Vidíte to dnes v jednom prehľade od kampane po aktiváciu?
```

**Follow-up 1** (3 days later, 449 characters)

```text
Dobrý deň,

ešte k tomu, čo sa teraz v spoločnosti {{company_name}} mení. Nová rola, nová ponuka alebo spojenie značiek je chvíľa, keď sa dá predajný lievik nastaviť nanovo, skôr než sa usadia staré zvyky. Pre Vodafone CZ sme po 14 workshopoch so 16 ľuďmi z CVM a online predaja namodelovali až 1 660 objednávok mesačne navyše, v lieviku, ktorý už mali. Má zmysel venovať tomu 20 minút a pozrieť sa, kde by to mohlo byť u vás?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 330 characters)

```text
Dobrý deň,

ozývam sa naposledy. Po veľkej zmene býva kalendár plný, tomu rozumiem. Len jedna poznámka: s tým, čo sa v lieviku nastaví v prvých mesiacoch, sa potom pracuje roky. Ak by sa hodil pohľad zvonku, stačí odpísať a nájdeme 20 minút. Ak to teraz nie je priorita, stačí napísať a prestanem sa ozývať.

{{sender_first_name}}
```

### Demo · Telco CVM · SK · problem

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Slovak. Start with 'Dobrý deň,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on one problem this ICP has, in the buyer's own terms (plenty of data but no single funnel from campaign to activation; online interest that still ends with a call-centre agent; viewers who don't want several apps), tied to one public fact about the company, such as selling online, in stores and by phone, or running several brands. End on one short question about how they handle it today. Don't pitch, cite numbers or clients, or guess at their internal results. Use formal vykanie, and no gendered first-person past tense ('videl/a som') or 'rád/rada'.

**Message 1 example** (222 characters). Fictional lead: Head of CVM at Wingtip Net (SK internet and TV operator), no recent trigger.

```text
Dobrý deň, Wingtip Net predáva internet aj televíziu cez web, v predajniach aj cez call centrum. Pri takom nastavení má zvyčajne každý tím vlastné čísla, ale jeden pohľad od kampane po aktiváciu chýba. Ako to máte dnes vy?
```

**Follow-up 1** (3 days later, 460 characters)

```text
Dobrý deň,

operátori to väčšinou riešia ďalším dashboardom alebo ďalším nástrojom. Dát potom pribúda, ale odpoveď na otázku, kde sa strácajú objednávky, stále chýba. My začíname inde: dáta zo všetkých systémov prepojíme do jedného lievika, od prvej kampane po aktiváciu. Pre Vodafone CZ to znamenalo šesť fáz lievika a jeden spoločný zdroj pravdy. Dávalo by zmysel prebrať za 20 minút, ako by to vyzeralo v spoločnosti {{company_name}}?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 392 characters)

```text
Dobrý deň,

ozývam sa naposledy, tak len jedna otázka na zamyslenie: koľko objednávok, ktoré začnú na webe, nakoniec dotiahne call centrum? A viete, v ktorom kroku sa zákazník rozhodne zavolať? Ak odpoveď nie je poruke, práve tam sa často skrývajú objednávky navyše. Radi to s vami prejdeme za 20 minút. Ak to teraz nie je priorita, stačí napísať a prestanem sa ozývať.

{{sender_first_name}}
```

### Demo · Telco CVM · SK · proof

**Message 1 brief** (for the LLM that writes custom message 1)

Write in Slovak. Start with 'Dobrý deň,' and no name, then 2–3 short sentences, under 400 characters in all. Rest it on the closest look-alike result, worded as Addvery's site has it: for a mobile, fixed or convergent operator, up to 1,660 extra orders a month (modelled) found in a telco's existing funnel; for streaming or pay-TV, 1.8 million customers moved to one new platform on the planned date, when two Czech media groups merged their streaming services. Describe the client by type, not name, add one clause on what it could mean for the lead's company, and end with 'Stálo by to za pohľad?'. Never drop 'up to' or 'modelled', round up, or promise the lead the same result. Use formal vykanie, and no gendered first-person past tense ('videl/a som') or 'rád/rada'.

**Message 1 example** (259 characters). Fictional lead: Commercial Director at Litware Mobil (SK mobile operator), selling online and by phone.

```text
Dobrý deň, pre českého operátora sme v jeho existujúcom predajnom lieviku našli až 1 660 objednávok mesačne navyše, podľa modelu. Litware Mobil tiež predáva cez web aj call centrum, takže podobný pohľad by mohol ukázať rezervy aj u vás. Stálo by to za pohľad?
```

**Follow-up 1** (3 days later, 485 characters)

```text
Dobrý deň,

krátko jeden príbeh z telekomunikácií. Vo Vodafone CZ sa väčšina objednávok stále dokončovala cez call centrum. Počas 14 workshopov so 16 ľuďmi z CVM a online predaja vzniklo sedem iniciatív s vyčíslenými nákladmi v jednej roadmape a model ukázal až 1 660 objednávok mesačne navyše, po odpočítaní prekryvov. Pre {{company_name}} by to bol rovnaký pohľad: koľko objednávok už leží vo vašom lieviku a koľko by stálo ich získať. Stálo by to za 20 minút?

{{sender_first_name}}
```

**Follow-up 2** (3 days after that, 458 characters)

```text
Dobrý deň,

ešte jeden príbeh, tentoraz zo streamingu. Dve české mediálne skupiny spojili svoje streamovacie služby do Oneplay a 1,8 milióna zákazníkov bolo treba previesť k verejne ohlásenému dátumu. Jeden tím naprieč 10+ oddeleniami, tri kolá cenových testov a štart 3. marca 2025, podľa plánu. Ak {{company_name}} čaká podobný krok, radi ukážeme, ako sme na to išli. Ak to teraz nie je priorita, stačí napísať a prestanem sa ozývať.

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
