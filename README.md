# PRG08-Deelproduct1

![UML](uml.png?raw=true "UML")

Getters and setters heb ik vanwege de ruimte niet opgenomen in het UML. In plaats daarvan heb ik de betreffende properties gewoon als public opgenomen.

## Live versie
https://srpater.github.io/PRG08-Eindproduct

## Installatie-instructies

- Clone of download de bestanden naar je eigen computer
- Open het project in Visual Studio Code
- Build het project (CTRL/CMD + Shift + B)
- Open de docs folder via je localhost

## Gameplay

- De bedoeling is om zo lang mogelijk de wolken te ontwijken
- Bewegen doe je met de pijltjestoetsen of WSAD

## Criteria

- Library: ik heb gekozen voor howler.js als library. Deze gebruik ik in de class Game om een geluid aan te maken en in de classes PlayingScreen en EndScreen om dit geluid af te spelen en te pauzeren.
- Encapsulation, composition, inheritance: zijn door het hele project toegepast. Voorbeelden:
- - Encapsulation: private properties en getters/setters in class Game.
- - Composition: class Game heeft meerdere GameObjects.
- - Inheritance: class Plane en class Cloud zijn children van parent class GameObject
- Singleton: toegepast in de class Game door middel van een static property "instance", die met een static method op te halen is.
- Observer: toegepast in de classes Plane en Cloud. Een Plane is een Observer die de verschillende Subjects (Clouds) in de gaten houdt.
- Strategy: toegepast door middel van de verschillende implementaties van de interface Screen: StartScreen, PlayingScreen en EndScreen.
- Interface, static, abstract: zijn op verschillende punten in het project verwerkt. Voorbeelden:
- - Interface: er zijn verschillende interfaces, zoals Observer, Subject en Screen.
- - Static: class Game heeft een static property "instance" en een static method om deze op te halen. Ook is er een class Util met een static method voor collision detection.
- - Abstract: GameObject een abstract class met een abstract method "move", waar Plane en Cloud van overerven.
- Namespaces, polymorphism, enumeraties: deze zijn ook op verschillende plekken toegepast. Voorbeelden:
- - Namespaces: er zijn een aantal namespaces, namelijk voor de GameObjects en voor de Screens.
- - Polymorphism: dit wordt bijvoorbeeld toegepast door een Plane en Clouds op te slaan in een array van GameObjects.
- - Enumeraties: dit wordt toegepast in de class Game om van Screen te kunnen wisselen.
- Game Loop: er is een GameLoop method in de class Game.