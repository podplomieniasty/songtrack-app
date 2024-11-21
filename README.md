Testowanie i Jakość Oprogramowania
=============
### **Autorzy**
##### **Bartosz Burzec, Tomasz Fela**



# **Apikacja do śledzenia utworów muzycznych w popkulturze**

### Opis 
Aplikacja służy do zliczania oraz dokumentowania wystąpień utworów muzycznych w popkulturze (filmy, seriale, piosenki, opcjonalnie memy oraz inne) na podstawie wpisów generowanych przez użytkowników. Jest to aplikacja budowana przez społeczność. Można przejrzeć listę wystąpień piosenki w wyżej wspomnianych kategoriach, kto je uzupełniał itp. Informacje o piosenkach, filmach, grach i serialach są pobierane z zewnętrznych API (Spotify API, IMDB API, IGDB API).


### Uruchamianie aplikacji
Uruchamianie aplikacji odbywa się przy użyciu **npm run dev**

### Testy
Testy w późniejszej fazie projektu

### Dokumentacja API
Dokumentacja API wygenerowana zostanie i dołączona do dokumentacji w późniejszej fazie projektu
###Przypadki testowania dla testera maualnego
Późniejsza faza projektu
###Technologie użyte w Projekcie 

##### 1. MongoDB
MongoDB to nierelacyjna baza danych (NoSQL), która przechowuje dane w formacie dokumentów JSON lub BSON. Używana jest do obsługi dużych ilości danych, gdzie struktura informacji może być zmienna. MongoDB pozwala na:

- Przechowywanie danych w elastycznej formie dokumentów (schemaless).
- Wysoką skalowalność poziomą (możliwość dodawania kolejnych serwerów w miarę wzrostu obciążenia).
- Szybkie operacje zapisu i odczytu.

Przykładowe zastosowanie w projekcie: MongoDB może przechowywać informacje o użytkownikach, produktach, zamówieniach, czy logach aplikacji.

##### 2. Express.js
Express.js to framework dla Node.js, który umożliwia szybkie i efektywne tworzenie aplikacji serwerowych oraz API (interfejsów komunikacji między aplikacjami). Jego kluczowe cechy to:

- Łatwość w zarządzaniu trasami (routing), co umożliwia obsługę różnych ścieżek URL w aplikacji.
- Middleware, czyli funkcje pośrednie, które ułatwiają np. obsługę błędów, autoryzację, logowanie.
- Integracja z bazami danych i innymi technologiami.

Przykładowe zastosowanie w projekcie: Express.js może obsługiwać zapytania klienta (np. formularze lub żądania API) i zwracać dane z MongoDB.

##### 3. Angular
Angular to framework front-endowy opracowany przez Google, służący do tworzenia dynamicznych aplikacji internetowych z bogatym interfejsem użytkownika (UI). Angular cechuje:

- **Dwukierunkowe wiązanie danych (two-way data binding):** Automatyczna synchronizacja między modelem danych a widokiem.
- **Modułowość:** Projektowanie aplikacji w postaci modułów, które ułatwiają organizację kodu.
- **RxJS i obserwatory:** Wspieranie reaktywnego programowania, co jest przydatne przy obsłudze danych w czasie rzeczywistym.
- **TypeScript:** Angular wykorzystuje TypeScript, co zwiększa bezpieczeństwo i przejrzystość kodu.

##### 4. Node.js
Node.js to środowisko uruchomieniowe dla języka JavaScript po stronie serwera. Pozwala na budowanie skalowalnych aplikacji internetowych i obsługę żądań w czasie rzeczywistym. Cechy Node.js:

- **Asynchroniczność:** Dzięki modelowi zdarzeniowemu obsługuje wiele żądań równolegle, co zwiększa wydajność.
- **Szeroki ekosystem:** Tysiące gotowych bibliotek dostępnych w npm (Node Package Manager).
- **Uniwersalność:** Node.js może być używany zarówno do tworzenia backendu, jak i narzędzi wspierających front-end.

Przykładowe zastosowanie w projekcie: Node.js uruchamia serwer aplikacji, obsługuje logikę backendową i komunikuje się z MongoDB oraz Angular.

##### Jak te technologie współpracują w projekcie?

1. **MongoDB:** Baza danych przechowuje dane.
2. **Node.js + Express.js:** Backend serwera aplikacji komunikuje się z bazą danych, przetwarza logikę biznesową i udostępnia API dla Angulara.
3. **Angular:** Frontend odpowiada za interfejs użytkownika, wysyła żądania do backendu (Express.js) i wyświetla dane użytkownikowi.
4. **Node.js:** Służy jako fundament dla Express.js i umożliwia obsługę serwera.

Ten stos technologiczny pozwala na pełne tworzenie aplikacji webowych od bazy danych po interfejs użytkownika.


**Table of Contents**

[TOCM]

[TOC]
