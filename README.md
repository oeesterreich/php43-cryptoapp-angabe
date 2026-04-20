# CryptoApp - Angabe - php43

Dies ist die Angabe zur Aufgabe "CryptoApp".
Aufbauend auf den Grundlagen des Datenbankzugriffs und Object-Relational-Mapping (ORM) werden hier das Model-View-Controller (MVC) Pattern und AJAX behandelt.

http://localhost/php43_angabe/server/api/purchase

Lösungsansatz für die CryptoApp
1. Überblick
   Dieser Lösungsansatz beschreibt die technische Umsetzung eines Vue.js-Frontend-Prototyps zur Verwaltung und zum Kauf von Kryptowährungen über eine REST-API. Die Anwendung basiert auf der Vorlage der CryptoCurrency GmbH und nutzt eine bestehende REST-Schnittstelle sowie externe Kursdaten von Bitpanda.
2. Architektur
   Die technische Gesamtarchitektur besteht aus:
   • Frontend: Vue.js 3 Anwendung zur Darstellung und Interaktion mit den Daten
   • Backend: REST-Schnittstelle zur Bereitstellung und Verarbeitung der Daten
   • Externe API: Bitpanda API (https://api.bitpanda.com/v1/ticker) zur Abfrage aktueller Kryptokurse
3. Umsetzungsschritte
   3.1 Modelle & REST-Schnittstelle
   • Modellierung von Purchase (Käufe) gemäß den vorgegebenen Attributen
   • Erweiterung mit Wallet-Klassen (für 'Gut' und 'Sehr Gut')
   • Nutzung der bestehenden CRUD-Endpunkte
   • Sortierte Ausgabe der Käufe nach Datum
   • Zusammenfassung von Käufen nach Kryptowährung
   3.2 Vue.js-Frontend
   • Aufbau eines neuen Vue.js 3 Projekts
   • Verwendung von Axios zur Kommunikation mit dem Backend
   • Komponentenstruktur:
   – PurchaseList (Anzeige aller Käufe)
   – PurchaseForm (Erstellen eines neuen Kaufs)
   – WalletList (Zusammenfassung aller Wallets)
   – WalletDetail (Anzeige aller Käufe eines Wallets)
   • Berechnung des aktuellen Kurswertes & prozentualen Gewinns im Frontend
   3.3 Bitpanda-API Integration
   • Abruf aktueller Kursdaten über die öffentliche Bitpanda-API
   • Mapping der Währungscodes (BTC, ETH, …)
   • Berechnung des aktuellen Werts: amount * aktueller Kurs
   • Hinweis: In produktiven Anwendungen sollte der Kursabruf serverseitig stattfinden
4. Erweiterte Anforderungen (Sehr Gut / Gut)
   • Einführung einer Wallet-Klasse (1:N zu Käufen)
   • Darstellung von Wallet-Zusammenfassungen im Frontend
   • Auswahl des Wallets bei der Erstellung eines Kaufs
   • Nutzung der erweiterten Endpunkte wie /wallet, /wallet/{id}, /wallet/{id}/purchase
5. Mockup-Umsetzung
   Das UI wird gemäß dem bereitgestellten Wireframe aufgebaut. Wichtig ist eine klare Strukturierung der Listenansichten, Formulare und Detailseiten.
6. Ergebnis
   Der entwickelte Prototyp ermöglicht:
   • Erfassung neuer Kryptowährungskäufe
   • Anzeige aller Käufe mit Berechnung des aktuellen Wertes
   • Gruppierung nach Kryptowährungen oder Wallets
   • Integration externer Kursdaten

