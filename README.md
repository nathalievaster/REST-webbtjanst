# REST API – Work Experience

Detta repository innehåller en REST-webbtjänst byggd med **Node.js**, **Express** och **PostgreSQL**. Syftet med tjänsten är att hantera arbetserfarenheter som t.ex. kan användas i ett CV.

API:et har stöd för fullständig **CRUD**-funktionalitet (Create, Read, Update, Delete), och datan returneras i JSON-format.

## Tekniker som används

- Node.js
- Express
- PostgreSQL
- CORS
- dotenv
- Thunder Client (för testning)

---

## API URL

Exempel vid lokal utveckling:  
`http://localhost:3000/api/workexperience`

---


## Klona detta repo:
   ```bash
   git clone https://github.com/nathalievaster/rest-webbtjanst.git
   cd rest-webbtjanst
```
--- 

## Databasstruktur

Tabellen `workexperience` har följande fält:

| Fält         | Typ          | Beskrivning                                 |
|--------------|--------------|---------------------------------------------|
| `id`         | SERIAL       | Primärnyckel, autoinkrementerande           |
| `companyname`| VARCHAR(255) | Namn på företaget                           |
| `jobtitle`   | VARCHAR(255) | Titel på arbetsrollen                       |
| `location`   | VARCHAR(255) | Plats där arbetet utfördes                  |
| `startdate`  | DATE         | Startdatum för anställningen                |
| `enddate`    | DATE         | Slutdatum för anställningen                 |
| `description`| TEXT         | Beskrivning av arbetsuppgifterna            |

---

## API Endpoints

| Metod  | Ändpunkt                   | Beskrivning                                   |
|--------|----------------------------|-----------------------------------------------|
| GET    | `/api/workexperience`      | Hämta alla arbetserfarenheter                 |
| GET    | `/api/workexperience/:id`  | Hämta en specifik post med ID                 |
| POST   | `/api/workexperience`      | Skapa ny arbetserfarenhet (kräver JSON-body) |
| PUT    | `/api/workexperience/:id`  | Uppdatera en post med angivet ID             |
| DELETE | `/api/workexperience/:id`  | Radera en post med angivet ID                |

---

## Exempel på POST/PUT-body

```json
{
  "companyname": "Mittuniversitetet",
  "jobtitle": "Labbhandledare",
  "location": "Sundsvall",
  "startdate": "2019-01-01",
  "enddate": "2019-12-31",
  "description": "Handledde studenter i programmeringskurser och hjälpte till med labbar."
}
```
## Validering

- Alla fält är obligatoriska.
- Om något fält saknas returneras ett specifikt felmeddelande med vilka fält som saknas.

---

## Cross-Origin Requests (CORS)

CORS är aktiverat så att webbtjänsten kan anropas från andra domäner.

---

## Projektstruktur

```bash
.
├── routes/
│   └── workexperience.js    # API-routes
├── db.js                    # Databasanslutning
├── initDB.js                # Skapar tabell
├── server.js                # Express-servern
├── .env                     # Miljövariabler
└── README.md                # Dokumentation
```