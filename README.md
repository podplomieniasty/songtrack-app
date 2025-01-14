Testowanie i Jakość Oprogramowania
=============
### **Autorzy**
##### **Bartosz Burzec, Tomasz Fela**


# **Aplikacja do śledzenia utworów muzycznych w popkulturze**

### Opis 
Aplikacja służy do zliczania oraz dokumentowania wystąpień utworów muzycznych w popkulturze (filmy, seriale, piosenki, opcjonalnie memy oraz inne) na podstawie wpisów generowanych przez użytkowników. Jest to aplikacja budowana przez społeczność. Można przejrzeć listę wystąpień piosenki w wyżej wspomnianych kategoriach, kto je uzupełniał itp. Informacje o piosenkach, filmach, grach i serialach są pobierane z zewnętrznych API (Spotify API, IMDB API, IGDB API).


### Uruchamianie aplikacji
<ul>
  <li>
    W celu uruchomienia aplikacji frontendowej, w katalogu <b>client</b> należy użyć polecenia <code>ng serve</code>.
  </li>
  <li>
    W celu uruchomienia aplikacji serwerowej, w katalogu <b>api</b> należy użyć polecenia <code>npm run dev</code>.
  </li>
</ul>

### Testy
| Rodzaj testów | Lokalizacja | Liczba testów | Opis |
| -             | -           | - | -    |
| jednostkowe   | api/lib/tests | 15 | Testy jednostkowe napisano dla indywidualnych serwisów aplikacji serwerowej. Serwisy są kluczowym elementem całej aplikacji, ponieważ opdowiadają za bezpośrednią komunikację z bazą danych i zwracanie danych wyświetlanych w aplikacji frontendowej. |
| integracyjne  | api/lib/tests/integration | 11 | Testom integracyjnym poddano najważniejsze kontrolery serwera, w celu poprawnego oszacowania kompatybilności z aplikacjami biblioteki Express.js i ocenienia jak radzą sobie w symulowanym, działającym środowisku. |
| manualne | interfejs użytkownika | 10 | Testom manualnym poddano formularze komunikacji użytkownika z aplikacją. Te formularze obsługują rejestrację i logowanie użytkownika do aplikacji.  |

### Dokumentacja API
Dokumentacja API wygenerowana zostanie i dołączona do dokumentacji w późniejszej fazie projektu

### Przypadki testowania dla testera maualnego
| | |
| - | - |
| ID | TC001 |
| Tytuł | Rejestracja nowego użytkownika |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Rejestracja'</li><li>Uzupełnij wszystkie dane formularza i zatwierdź</li></ol> |
| Rezultat | Przeniesienie do głównego ekranu aplikacji, pomyślna rejestracja | 

| | |
| - | - |
| ID | TC002 |
| Tytuł | Rejestracja użytkownika z pustymi wartościami |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Rejestracja'</li><li>Zatwierdź formularz bez wpisywania żadnych wartości</li></ol> |
| Rezultat | Komunikat o błędzie rejestracji, brak utworzonego konta | 

| | |
| - | - |
| ID | TC003 |
| Tytuł | Rejestracja użytkownika z błędnymi znakami w nazwie |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Rejestracja'</li><li>Uzupełnij pole 'Nazwa' wartością zawierającą znaki spoza zakresu: [a-zA-Z0-9_]</li><li>Uzupełnij pole 'Hasło' wartością dłuższą lub równą 6 znakom</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o wykrytych błędnych wartościach, brak utworzonego konta | 

| | |
| - | - |
| ID | TC004 |
| Tytuł | Rejestracja użytkownika z za krótkim hasłem |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Rejestracja'</li><li>Uzupełnij pole 'Nazwa' poprawną wartością</li><li>Uzupełnij pole 'Hasło' wartością krótszą niż 6 znaków</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o za krótkim haśle, brak utworzonego konta | 

| | |
| - | - |
| ID | TC005 |
| Tytuł | Rejestracja użytkownika o istniejącej w bazie nazwie |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Rejestracja'</li><li>Uzupełnij pole 'Nazwa' wartością: 'sivetive'</li><li>Uzupełnij pole 'Hasło' wartością dłuższą lub równą 6 znakom</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o istniejącym koncie, brak utworzonego konta | 

| | |
| - | - |
| ID | TC006 |
| Tytuł | Logowanie użytkownika |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Logowanie'</li><li>Uzupełnij pole 'Nazwa' wartością istniejącą w bazie</li><li>Uzupełnij pole 'Hasło' wartością odpowiadającą podanej nazwie</li><li>Zatwierdź</li></ol> |
| Rezultat | Przeniesienie do głównej strony aplikacji, widoczny przycisk 'Wyloguj', pomyślne logowanie |

| | |
| - | - |
| ID | TC007 |
| Tytuł | Logowanie użytkownika z pustymi wartościami |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Logowanie'</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o wykrytych błędnych wartościach, błąd logowania |

| | |
| - | - |
| ID | TC008 |
| Tytuł | Logowanie użytkownika z błędną nazwą użytkownika |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Logowanie'</li><li>Uzupełnij pole 'Nazwa' wartością zawierającą znaki spoza zakresu: [a-zA-Z0-9_]</li><li>Uzupełnij pole 'Hasło' wartością dłuższą lub równą 6 znakom</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o wykrytych błędnych wartościach, błąd logowania |

| | |
| - | - |
| ID | TC009 |
| Tytuł | Logowanie użytkownika z nieistniejącym użytkownikiem |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Logowanie'</li><li>Uzupełnij pole 'Nazwa' wartością nie znajdującą się w bazie.</li><li>Uzupełnij pole 'Hasło' wartością dłuższą lub równą 6 znakom</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o nieistniejącym użytkowniku, błąd logowania |

| | |
| - | - |
| ID | TC010 |
| Tytuł | Logowanie użytkownika z błędnym hasłem |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Logowanie'</li><li>Uzupełnij pole 'Nazwa' wartością znajdującą się w bazie.</li><li>Uzupełnij pole 'Hasło' wartością nie odpowiadającą danemu kontu</li><li>Zatwierdź</li></ol> |
| Rezultat | Komunikat o błędzie walidacji, błąd logowania |

| | |
| - | - |
| ID | TC011 |
| Tytuł | Poprawne wyszukiwanie utworów |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Wpisy'</li><li>Uzupełnij pole wyszukiwania pełnym tytułem piosenki, która jest wyświetlona na stronie.</li></ol> |
| Rezultat | Na stronie Wpisy wyświetla się tylko jeden wpis odpowiadający wyszukanej frazie. |

| | |
| - | - |
| ID | TC012 |
| Tytuł | Wyszukiwanie fragmentem utworu |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Wybierz zakładkę 'Wpisy'</li><li>Uzupełnij pole wyszukiwania fragmentem tytułu piosenki, która jest wyświetlona na stronie.</li></ol> |
| Rezultat | Na stronie Wpisy wyświetla się jeden lub więcej utworów zawierających w tytule fragment danej frazy. |

| | |
| - | - |
| ID | TC013 |
| Tytuł | Dodawanie utworu |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Wybierz opcję 'Dodaj nowy'</li><li>Uzupełnij pole wyszukiwania tytułem nieistniejącego w bazie utworu i kliknij 'Szukaj'.</li><li>Z rozwijanej listy kliknij docelowy utwór.</li><li>Wybierz opcję 'Film'.</li><li>Wpisz w kolejnym polu tytuł filmu i kliknij 'Szukaj'.</li><li>Kliknij przycisk 'Dodaj wpis'.</li></ol> |
| Rezultat | Na stronie Wpisy wyświetla się wpisany utwór z liczbą filmów o wartości 1. |

| | |
| - | - |
| ID | TC014 |
| Tytuł | Aktualizowanie utworu |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Wybierz opcję 'Dodaj nowy'</li><li>Uzupełnij pole wyszukiwania tytułem istniejącego utworu i kliknij 'Szukaj'.</li><li>Z rozwijanej listy kliknij docelowy utwór.</li><li>Wybierz opcję 'Film'.</li><li>Wpisz w kolejnym polu tytuł filmu i kliknij 'Szukaj'.</li><li>Kliknij przycisk 'Dodaj wpis'.</li></ol> |
| Rezultat | Na stronie Wpisy wyświetla się wpisany utwór ze zwiększoną o 1 liczbą filmów. |

| | |
| - | - |
| ID | TC015 |
| Tytuł | Dodawanie utworu z pustą nazwą utworu |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Wybierz opcję 'Dodaj nowy'</li>Kliknij 'Szukaj'.</li></ol> |
| Rezultat | Brak kolejnej akcji, pojawia się komunikat o błędzie. |

| | |
| - | - |
| ID | TC016 |
| Tytuł | Dodawanie utworu z pustą nazwą filmu |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Uzupełnij pole wyszukiwania tytułem istniejącego utworu i kliknij 'Szukaj'.</li><li>Z rozwijanej listy kliknij docelowy utwór.</li><li>Wybierz opcję 'Film'.</li><li>Kliknij "Szukaj".</li></ol> |
| Rezultat | Brak kolejnej akcji, pojawia się komunikat o błędzie. |

| | |
| - | - |
| ID | TC017 |
| Tytuł | Dodawanie filmu nieistniejącego w bazie filmów |
| Warunki początkowe | uruchomiona aplikacja frontendowa i serwerowa, dostęp do sieci  |
| Kroki testowe | <ol><li>Uzupełnij pole wyszukiwania tytułem istniejącego utworu i kliknij 'Szukaj'.</li><li>Z rozwijanej listy kliknij docelowy utwór.</li><li>Wybierz opcję 'Film'.</li><li>Wpisz tytuł filmu, który nie istnieje w bazie, lub losowy ciąg znaków.</li><li>Kliknij 'Szukaj'.</li></ol> |
| Rezultat | Brak kolejnej akcji, pojawia się komunikat o błędzie. |

### Technologie użyte w Projekcie 

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


