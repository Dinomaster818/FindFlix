# FindFlix
FindFlix är en webbtjänst som gör det enkelt för användare att söka och upptäcka både böcker och filmer. Den kombinerar funktioner från plattformar som OMDB och Google Books för att ge rekommendationer om filmer baserat på böcker och vice versa. 

När du söker efter en bok kommer FindFlix att föreslå filmer som är relaterade till boken, och omvänt. Tjänsten ger också användarna detaljerad information om böcker och filmer, inklusive publiceringsdatum, betyg och författare. 

Du kan skapa ett personligt konto för att hantera favoriter och önskelistor med böcker och filmer som du vill läsa eller se. För att spara böcker eller filmer behöver du skapa ett konto och logga in.

# Homepage
![homepage](https://github.com/Dinomaster818/FindFlix/assets/61086008/e2f3113a-d6ca-437d-9c41-e4728df42329)



# Installationsguide
* Ladda ner och installera Visual Studio Code (VS Code).

* Klona projektets repository till din dator eller ladda ner projektet till din dator.
* Öppna projektmappen i VS Code.
* Skriv i terminalen npm install node. Om du använder Linux, ladda ner npm först innan du installerar node. Det gör du genom att skriva sudo apt install npm i terminalen i VS Code.
* Skriv i terminalen npm install sqlite3
* Starta sedan applikationen genom att skriva npm start i terminalen.
  ![terminal](https://github.com/Dinomaster818/FindFlix/assets/61086008/e523b69a-f621-4055-be42-53768d941df9)

* Öppna din webbläsare och navigera till http://localhost:3000/ för att visa projektet lokalt.
  ![localhost](https://github.com/Dinomaster818/FindFlix/assets/61086008/c4d66cfb-e626-45cd-96ac-8ed5509055bf)


# Troubleshooting
Om du har problem med att starta programmet testa dessa steg:
* Skriv i terminalen npm audit fix --force om du får några errors eller critical vurnabilities i terminalen.
* Om du inte öppnade projektet i root så får du skriva i terminalen cd "filsökningsvägen till rooten till projektet alltså där FindFlix mappen startar". Därefter skriver du i terminalen npm start. Glöm inte bort att ta bort " " när skriver den första kommandot.
