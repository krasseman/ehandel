# webshop-final-front-end-task
Final front end task för WIEG17

Lägg upp ert projekt på git, samt länk till projektet på er live server.
Lägg upp alla krav nedan som issues.

Lägg upp egna labels som visar vilka issues som är ”godkänt” respektive ”väl godkänt”.
De issues som krävs för väl godkänt är markerade med (vg) efter issue beskrivning. 

Se till att stänga de issues ni är klara med.

Sidan skall vara responsiv.

All data skall sparas i JSON filer, bedöm när de ska sparas i localStorage och när vi ska använda sessionStorage. 
Jag kommer att bifoga exempel på 4 st JSON filer som ni skall starta med, för huvudkategorier, underkategorier, produkter och för kunder. Ni får och ska ändra innehållet i dessa efter era behov och inriktningen på er webshop men den basala strukturen skall behållas.
Dvs ni skall fylla på produkt JSON med mer produkter. NEJ ni måste inte göra en instrumentbutik, byt ut till vad ni vill men strukturen skall vara den samma.
Ni FÅR lägga till fler objekt i strukturen om ni behöver.

Det skall finnas minst 4 produkter per underkategori.

Huvudmenyn skall innehålla: start, 4 produktkategorier (huvudkategorier från en json fil), info, kontakt, kundvagn.

Start sidan får ni fylla med valfritt innehåll.

Det skall finnas plats för en undermeny som visar en lista på underkategorier som tillhör huvudmeny-kategorierna. 

Vi skall även visa ett rutnät med sammanfattning över alla produkter som skall visas, när vi klickar på en huvudkategori så skall den visa alla produkter från alla underkategorier till huvudkategorin, klickar vi på en underkategori så skall vi bara visa produkter som tillhör underkategorin. (vg)

Klickar vi på en produkt ska vi komma till en produktsida med mer info.

Vi skall kunna lägga produkter i en kundvagn.

Går vi till kundvagnssidan så skall den visa våra produkter i kundvagnen, samt räkna ihop totalsumman, plus 55kr i frakt.

Innan vi kan beställa produkterna så ska vi få möjligheten att antingen logga in eller skapa ett konto.

Skapar vi ett konto så skall kunden fylla i:
Namn, Adress, email (som oxå är inloggning) och telefonnummer, samt klicka i om de vill ha nyhetsbrev. (Vg)

Skickar vi vår order så skall vi se en ”tack” sida. 
Samt spara ordern i en JSON fil (vg)

Vi skall kunna komma åt en adminsida om vi går in på er domän/admin. Inloggade på admin (här kan ni sätta ett fast lösenord) så skall vi ha meny alternativen: start, kundlista, orderlista, epost lista. 

Startsidan får ni fylla med valfritt innehåll. 

Kundlistan visar en lista på alla kunder.

Orderlistan listar alla orders. (vg)

Epostlistan listar alla mailadresser med ett ”, ” mellan från alla kunder som vill ha ett nyhetsbrev. (vg)
