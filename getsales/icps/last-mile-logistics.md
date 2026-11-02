# Last-mile logistics: workflow copy

**Needs a native read.** The Czech and German especially; the English is native-level but unreviewed.

ICP: parcel, last-mile and cross-border logistics companies entering new markets. Three languages, Czech, German and English, with three approaches each: nine workflows. Slovak leads get the Czech workflows. These are Addvery's messages to Addvery's prospects, sent by an Addvery person.

Every workflow: message 1 is `{{custom_message_1}}`, computed per lead before import and sent 1 day after they accept, or at once if already connected. Follow-up 1 goes 3 days later, follow-up 2 3 days after that. Any reply stops the sequence.

## Proof used

Only as Addvery's own site states it:

- **BOX NOW (Greece):** Addvery "co-founded" it, built its tech, brand and operations, and led it in an interim role "for over a year". Results: "700+ smart lockers", "60+ Greek cities", "6 months from zero".
- **Problem lines:** "Home delivery only works when someone is home"; a new company with no network, systems or brand yet.
- **Offer named on the Transport & Logistics page:** cross-border logistics strategy, smart-locker and last-mile setup, platform and system integration, data-driven performance analysis.

Left out: Packeta (a logo on the home page, no stated result), the Děčín bus company case (municipal transport, not a look-alike) and the podcast's 20 to 30% cost-per-parcel figure (a guest's claim, not a case result). BOX NOW is the only logistics proof, so the signal and proof cells both use it; the problem cells use none.

## Notes for the native reader

- **No first name in Czech.** The Czech greeting is "Dobrý den," because `{{first_name}}` would fill in the nominative ("Dobrý den, Petr") instead of the vocative.
- **Company name stays in the nominative.** `{{company_name}}` always follows "firma", "firmu" or "firmě", so it never has to decline. In German it follows "bei" or "für", or stands as the subject.
- **German** opens with "Hallo {{first_name}}," and uses Sie throughout.
- **No gendered first-person singular past tense.** The only past tenses are the company's "we" ("jsme spoluzaložili", "vybudovali", "vedli"). The sender's own lines are in the present or future ("ozývám se", "už se nebudu ozývat").
- **Terms:** "chytré boxy" or "výdejní boxy" for smart lockers, "výdejní místa" for pickup points, "poslední míle" for the last mile. In German: "Paketautomaten" for lockers ("smarte Paketautomaten" in the BOX NOW result), "Abholstellen" for pickup points, "letzte Meile"; never "Packstation", which is a DHL brand.
- **Example leads are fictional,** using sample-company names. Two match the routing sample.

## Czech (CS)

### Demo · Last-mile logistics · CS · signal

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when enrichment found a dated trigger in the last 90 days: announced entry into a new country, a rollout of lockers (výdejní boxy) or pickup points, a funding round, a new country manager or expansion hire, or an acquisition. Open with that trigger in plain words and its month. Then one sentence on why that moment matters for the last mile: in a new market a company starts with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. End with one easy question about where they are with it. Write in Czech with formal address (vykání). Start with 'Dobrý den,' and no name, so there is no vocative or gender to get wrong; no sign-off. Avoid first-person singular past tense ('viděl jsem'); use 'zaujalo mě' or the present tense. Put a noun before the company name ('společnost X', 'firma X') so the name stays in the nominative and the verb agrees with the noun. 2-3 sentences, under 400 characters including the greeting. Must not: flatter or congratulate at length, cite any number or client, list services, ask for a call, say where the news was found, use a trigger older than 90 days, or touch anything private.

**Message 1 example** (fictional lead: Contoso Kurýr, a Czech courier that announced entry into Slovakia in October)

> Dobrý den, zaujalo mě, že společnost Contoso Kurýr v říjnu oznámila vstup na Slovensko. Na novém trhu se začíná bez sítě, systémů i značky a to, co se rozhodne v prvních měsících, pak na roky určuje náklady na zásilku. Jak daleko jste s plánem poslední míle na Slovensku?

**Follow-up 1** (3 days later)

> Dobrý den, ještě k načasování. V takové fázi růstu rozhodnou první měsíce o podobě celé sítě: kde budou stát boxy, kteří partneři převezmou objem a na jakých systémech to celé poběží. Měnit to později je pomalé a drahé. V Addvery jsme spoluzaložili BOX NOW v Řecku a vybudovali jeho technologie, značku i provoz: přes 700 chytrých boxů ve více než 60 řeckých městech za šest měsíců od nuly. Stálo by to za 20minutový rozhovor? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Dobrý den, ozývám se naposledy. Pokud firma {{company_name}} právě vstupuje na nový trh nebo rozšiřuje síť, umíme pomoct s tím, co obvykle drhne: kam umístit boxy a výdejní místa, jak nastavit spolupráci s partnery a přeshraniční toky zásilek a jak to celé propojit v systémech. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat. A pokud jen nesedí načasování, pošlete jedno slovo: později. {{sender_first_name}}

### Demo · Last-mile logistics · CS · problem

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when there is no fresh trigger and no close look-alike case. Open with one problem this ICP has, in the buyer's own words, tied to one public fact about their company: mostly home delivery, so repeat attempts when nobody is home ('doručení domů funguje, jen když je někdo doma'); lockers or pickup points placed where space was free rather than where people collect; parcels moving across several countries; depots, partners and systems whose data doesn't connect. Put it as an observation or a question, never a diagnosis: you don't know their numbers. End with one easy question. Write in Czech with formal address (vykání). Start with 'Dobrý den,' and no name, so there is no vocative or gender to get wrong; no sign-off. Avoid first-person singular past tense; use the present tense. Put a noun before the company name ('společnost X', 'firma X') so the name stays in the nominative and the verb agrees with the noun. Avoid 'každý druhý' (it means 'every other'). 2-3 sentences, under 400 characters including the greeting. Must not: claim to know their failure rates or costs, cite numbers or clients, pitch services, ask for a call, or use anything private.

**Message 1 example** (fictional lead: Tailspin Parcel CZ, a domestic courier with 950 staff, lead is the COO (lead L09 in the routing sample))

> Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte letos úspěšnost prvního doručení, nebo to máte pod kontrolou?

**Follow-up 1** (3 days later)

> Dobrý den, drahou poslední míli řeší většina dopravců stejně: víc aut, víc termínů pro opakované doručení, víc boxů tam, kde se zrovna našlo místo. Přidá to kapacitu, ale příčinu to většinou neodstraní. V Addvery začínáme od dat: kde se zásilky napoprvé nedoručí, kde si lidé balíky opravdu vyzvedávají a co stojí jednotlivé trasy a místa. Pak to s vámi postavíme, od rozmístění a partnerů po systémy, a nekončíme u prezentace. Našlo by se na to 20 minut? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Dobrý den, ještě jednou a naposledy. Pokud máte na příští rok v plánu zvednout úspěšnost prvního doručení, zpřehlednit přeshraniční toky zásilek nebo dostat síť výdejních míst do zisku, můžeme na datech, která už máte, ukázat, jak by to ve firmě {{company_name}} mohlo vypadat. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat. {{sender_first_name}}

### Demo · Last-mile logistics · CS · proof

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when the lead's company looks like Addvery's BOX NOW case: building or growing a locker or pickup-point network, or launching parcel delivery in a new market. Open with the result exactly as Addvery's site states it, in Czech: Addvery co-founded BOX NOW in Greece, which went from zero to 700+ smart lockers in 60+ Greek cities in six months ('přes 700 chytrých boxů ve více než 60 řeckých městech za šest měsíců od nuly'). Then one sentence tying it to one public fact about the lead's company. End with one easy question. Write in Czech with formal address (vykání). Start with 'Dobrý den,' and no name, so there is no vocative or gender to get wrong; no sign-off. Avoid first-person singular past tense; 'v Addvery jsme spoluzaložili' is fine. Put a noun before the company name ('společnost X', 'firma X') so the name stays in the nominative and the verb agrees with the noun. 2-3 sentences, under 400 characters including the greeting. Must not: round up, change or add to those numbers, promise the lead the same result, cite any other client, name anyone at BOX NOW, pitch services, or ask for a call.

**Message 1 example** (fictional lead: Fabrikam Logistika, growing a parcel-locker network in Moravia)

> Dobrý den, v Addvery jsme spoluzaložili řecký BOX NOW, který měl za šest měsíců od nuly přes 700 chytrých boxů ve více než 60 městech. Firma Fabrikam Logistika teď rozšiřuje síť výdejních boxů na Moravě, což je podobná úloha. Máte už jasno, kam boxy umístit?

**Follow-up 1** (3 days later)

> Dobrý den, příběh BOX NOW ve zkratce. Na začátku byla nová firma bez sítě, systémů i značky. V Addvery jsme ji spoluzaložili, vybudovali její technologie, značku i provoz a přes rok ji vedli v interimové roli. Za šest měsíců od nuly měla přes 700 chytrých boxů ve více než 60 řeckých městech. Pro firmu {{company_name}} by to mohlo znamenat jeden tým, který síť naplánuje, postaví systémy a zůstane, dokud se to nerozjede. Má smysl se na to podívat? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Dobrý den, tohle je poslední zpráva ode mě. Pokud ve firmě {{company_name}} řešíte síť výdejních boxů, vstup na nový trh nebo nové nastavení poslední míle, můžeme za 20 minut projít, jak se BOX NOW dostal od nuly na více než 700 boxů a co by se z toho dalo použít u vás. Pokud to teď není priorita, stačí napsat a už se nebudu ozývat. {{sender_first_name}}

## German (DE)

### Demo · Last-mile logistics · DE · signal

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when enrichment found a dated trigger in the last 90 days: announced entry into a new country, a rollout of parcel lockers (Paketautomaten) or pickup points (Abholstellen), a funding round, a new country manager or expansion hire, or an acquisition. Open with that trigger in plain words and its month. Then one sentence on why that moment matters for the last mile: in a new market a company starts with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. End with one easy question about where they are with it. Write in German with formal Sie. Start with 'Hallo <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: flatter or congratulate at length, cite any number or client, list services, ask for a call, say where the news was found, use a trigger older than 90 days, or touch anything private.

**Message 1 example** (fictional lead: Lena, Head of Expansion at Adatum Paketdienst, a German parcel company that announced entry into Austria in October)

> Hallo Lena, Adatum Paketdienst hat im Oktober den Markteintritt in Österreich angekündigt. In einem neuen Markt startet man ohne Netz, Systeme und Marke, und was in den ersten Monaten entschieden wird, prägt die Kosten pro Paket über Jahre. Wie weit ist der Plan für die letzte Meile dort?

**Follow-up 1** (3 days later)

> Hallo {{first_name}}, noch ein Gedanke zum Timing. In einer Wachstumsphase wie dieser legen die ersten Monate die Form des Netzes fest: wo die Paketautomaten stehen, welche Partner das Volumen tragen und auf welchen Systemen alles läuft. Das später zu ändern, ist langsam und teuer. Bei Addvery haben wir BOX NOW in Griechenland mitgegründet und Technik, Marke und Betrieb aufgebaut: über 700 smarte Paketautomaten in über 60 griechischen Städten, in sechs Monaten von null. Lohnt sich ein Austausch von 20 Minuten? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hallo {{first_name}}, das ist meine letzte Nachricht. Wenn {{company_name}} gerade einen neuen Markt erschließt oder das Netz ausbaut, helfen wir bei dem, was gern hakt: wo Paketautomaten und Abholstellen hinkommen, Partner und grenzüberschreitende Paketströme und die Systeme, die alles verbinden. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr. Und wenn nur der Zeitpunkt nicht passt, genügt ein Wort: später. {{sender_first_name}}

### Demo · Last-mile logistics · DE · problem

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when there is no fresh trigger and no close look-alike case. Open with one problem this ICP has, in the buyer's own words, tied to one public fact about their company: mostly home delivery, so repeat attempts when nobody is home ('Haustürzustellung klappt nur, wenn jemand zu Hause ist'); lockers or pickup points placed where space was free rather than where people collect; parcels moving across several countries; depots, partners and systems whose data doesn't connect. Put it as an observation or a question, never a diagnosis: you don't know their numbers. End with one easy question. Write in German with formal Sie. Start with 'Hallo <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: claim to know their failure rates or costs, cite numbers or clients, pitch services, ask for a call, or use anything private.

**Message 1 example** (fictional lead: Michael, COO at Trey Kurier, an Austrian courier that still delivers mostly to the door)

> Hallo Michael, Trey Kurier stellt die meisten Pakete an der Haustür zu, und Haustürzustellung klappt nur, wenn jemand zu Hause ist. Jeder weitere Zustellversuch geht von der Marge der Tour ab. Ist die Erstzustellquote dieses Jahr ein Thema bei Ihnen, oder haben Sie das im Griff?

**Follow-up 1** (3 days later)

> Hallo {{first_name}}, eine teure letzte Meile lösen die meisten Paketdienste gleich: mehr Fahrzeuge, mehr Zweitzustellungen, mehr Paketautomaten dort, wo gerade Platz frei ist. Das schafft Kapazität, behebt aber selten die Ursache. Bei Addvery fangen wir bei den Daten an: wo Pakete beim ersten Versuch scheitern, wo Kunden tatsächlich abholen, was jede Tour und jeder Standort kostet. Dann setzen wir es mit Ihnen um, von Standorten und Partnern bis zu den Systemen, statt bei Folien aufzuhören. 20 Minuten wert? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hallo {{first_name}}, kurz zum Abschluss. Wenn die Erstzustellquote, grenzüberschreitende Paketströme oder ein Abholnetz, das sich rechnet, für nächstes Jahr auf der Liste stehen, zeigen wir Ihnen gern, wie das bei {{company_name}} aussehen könnte, ausgehend von den Daten, die Sie schon haben. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr. {{sender_first_name}}

### Demo · Last-mile logistics · DE · proof

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when the lead's company looks like Addvery's BOX NOW case: building or growing a locker or pickup-point network, or launching parcel delivery in a new market. Open with the result exactly as Addvery's site states it, in German: Addvery co-founded BOX NOW in Greece, which went from zero to 700+ smart lockers in 60+ Greek cities in six months ('über 700 smarte Paketautomaten in über 60 griechischen Städten, in sechs Monaten von null'). Then one sentence tying it to one public fact about the lead's company. End with one easy question. Write in German with formal Sie. Start with 'Hallo <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: round up, change or add to those numbers, promise the lead the same result, cite any other client, name anyone at BOX NOW, pitch services, or ask for a call.

**Message 1 example** (fictional lead: Julia at Wingtip Logistik, building a parcel-locker network in Bavaria)

> Hallo Julia, bei Addvery haben wir BOX NOW in Griechenland mitgegründet, das in sechs Monaten von null auf über 700 smarte Paketautomaten in über 60 griechischen Städten wuchs. Wingtip Logistik baut gerade ein Netz von Paketautomaten in Bayern auf, eine ähnliche Aufgabe. Ist schon klar, wo die Automaten stehen sollen?

**Follow-up 1** (3 days later)

> Hallo {{first_name}}, die Geschichte von BOX NOW in Kürze. Am Anfang stand ein neues Unternehmen ohne Netz, Systeme und Marke. Wir haben es mitgegründet, Technik, Marke und Betrieb aufgebaut und es über ein Jahr lang übergangsweise geführt. Nach sechs Monaten ab null hatte es über 700 smarte Paketautomaten in über 60 griechischen Städten. Für {{company_name}} hieße das: ein Team, das das Netz plant, die Systeme baut und bleibt, bis alles läuft, statt drei Dienstleistern und einer Präsentation. Einen Blick wert? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hallo {{first_name}}, meine letzte Nachricht. Wenn bei {{company_name}} ein Netz aus Paketautomaten, ein neuer Markt oder ein neues Setup für die letzte Meile ansteht, könnten Ihnen 20 Minuten darüber, wie BOX NOW von null auf über 700 Automaten kam, ein paar Umwege ersparen. Wenn das gerade keine Priorität ist, sagen Sie es einfach, dann melde ich mich nicht mehr. {{sender_first_name}}

## English (EN)

### Demo · Last-mile logistics · EN · signal

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when enrichment found a dated trigger in the last 90 days: announced entry into a new country, a locker or pickup-point rollout, a funding round, a new country manager or expansion hire, or an acquisition. Open with that trigger in plain words and its month. Then one sentence on why that moment matters for the last mile: in a new market a company starts with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. End with one easy question about where they are with it. Write in English. Start with 'Hi <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: flatter or congratulate at length, cite any number or client, list services, ask for a call, say where the news was found, use a trigger older than 90 days, or touch anything private.

**Message 1 example** (fictional lead: Dana, Head of Expansion at Coho Last Mile, which announced entry into Hungary in October (lead L10 in the routing sample))

> Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there?

**Follow-up 1** (3 days later)

> Hi {{first_name}}, one more thought on timing. In a growth step like this one, the first months fix the shape of the network: where the lockers go, which partners carry the volume, which systems it all runs on. Changing that later is slow and expensive. At Addvery we co-founded BOX NOW in Greece and built its tech, brand and operations: 700+ smart lockers in 60+ Greek cities, six months from zero. Worth 20 minutes to compare notes? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hi {{first_name}}, last note from me. If {{company_name}} is opening a market or growing its network right now, we can help with the parts that tend to slip: where lockers and pickup points go, partners and cross-border flows, and the systems that tie it all together. If it's not a priority, just say so and I'll stop. And if it's just bad timing, a one-word 'later' works too. {{sender_first_name}}

### Demo · Last-mile logistics · EN · problem

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when there is no fresh trigger and no close look-alike case. Open with one problem this ICP has, in the buyer's own words, tied to one public fact about their company: mostly home delivery, so repeat attempts when nobody is home ('home delivery only works when someone is home'); lockers or pickup points placed where space was free rather than where people collect; parcels moving across several countries; depots, partners and systems whose data doesn't connect. Put it as an observation or a question, never a diagnosis: you don't know their numbers. End with one easy question. Write in English. Start with 'Hi <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: claim to know their failure rates or costs, cite numbers or clients, pitch services, ask for a call, or use anything private.

**Message 1 example** (fictional lead: Maria at Northwind Parcel, a carrier that still delivers mostly to the door)

> Hi Maria, Northwind Parcel still takes most of its parcels to the door, and home delivery only works when someone is home. Each repeat attempt eats into the margin on that route. Is first-attempt success on your list this year, or is it under control?

**Follow-up 1** (3 days later)

> Hi {{first_name}}, most parcel companies handle a costly last mile the same way: more vans, more redelivery slots, more lockers wherever a site happens to be free. That adds capacity, but rarely fixes the cause. At Addvery we start from the data: where parcels fail first time, where people actually collect, what each route and location costs. Then we build it with you, from placement and partners to the systems behind them, and don't stop at a slide deck. Worth 20 minutes? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hi {{first_name}}, closing the loop. If first-attempt success, cross-border flows or a pickup network that pays its way are on the list for next year, we can show how it could look at {{company_name}}, starting from the data you already have. If it's not a priority, just say so and I'll stop. {{sender_first_name}}

### Demo · Last-mile logistics · EN · proof

**Message 1 brief** (for the LLM that writes `custom message 1`)

Use when the lead's company looks like Addvery's BOX NOW case: building or growing a locker or pickup-point network, or launching parcel delivery in a new market. Open with the result exactly as Addvery's site states it: Addvery co-founded BOX NOW in Greece, which went from zero to 700+ smart lockers in 60+ Greek cities in six months. Then one sentence tying it to one public fact about the lead's company. End with one easy question. Write in English. Start with 'Hi <first name>,'; no sign-off. 2-3 sentences, under 400 characters including the greeting. Must not: round up, change or add to those numbers, promise the lead the same result, cite any other client, name anyone at BOX NOW, pitch services, or ask for a call.

**Message 1 example** (fictional lead: Lukas at Wide World Delivery, adding pickup points across Slovakia)

> Hi Lukas, at Addvery we co-founded BOX NOW in Greece, which went from zero to 700+ smart lockers in 60+ Greek cities in six months. Wide World Delivery is now adding pickup points across Slovakia, a similar build in a new market. Is the locker side part of that plan?

**Follow-up 1** (3 days later)

> Hi {{first_name}}, the short version of the BOX NOW story. It started as a new company with no network, systems or brand. We co-founded it, built its tech, brand and operations, and led it in an interim role for over a year. Six months from zero, it had 700+ smart lockers in 60+ Greek cities. For {{company_name}}, it could mean one team that plans the network, builds the systems and stays until it runs, instead of three vendors and a deck. Worth a look? {{sender_first_name}}

**Follow-up 2** (3 days after that, the last touch)

> Hi {{first_name}}, last one from me. If a locker network, a new market or a new last-mile setup is on the table at {{company_name}}, 20 minutes on how BOX NOW went from zero to 700+ lockers might save you a few wrong turns. If it's not a priority, just say so and I'll stop. {{sender_first_name}}
