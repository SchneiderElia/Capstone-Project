# Capstone Project

# App Dashboard Personale con Note (React & Node)

## Descrizione Breve

Un'applicazione web full-stack che permette agli utenti di organizzare informazioni e appunti utilizzando "contenitori" (o blocchi) personalizzabili su una dashboard personale. Include un sistema di autenticazione utente sicuro tramite JWT (con registrazione/login standard via email/password) e login tramite Google OAuth 2.0.

## Funzionalità Principali

* **Autenticazione Utente:**
    * Registrazione sicura con hashing delle password (bcrypt).
    * Login con Email/Password.
    * Login/Registrazione tramite Google OAuth 2.0.
    * Gestione sessioni tramite JWT (jsonwebtoken) salvato in Local Storage.
    * Protezione delle rotte API backend tramite middleware di autorizzazione JWT.
* **Dashboard Principale:**
    * Visualizzazione personalizzata dei "Contenitori" (blocchi) per l'utente loggato.
    * Layout dinamico dei contenitori (es. 70%/30% alternato).
    * Creazione di nuovi contenitori tramite API (`POST /blocks`).
    * Visualizzazione del nome utente loggato.
* **Gestione Contenitori:**
    * Titolo del contenitore modificabile ("inline" tramite componente `EditableTitle`).
    * Salvataggio delle modifiche al titolo tramite API (`PUT /blocks/:id`).
    * Eliminazione di contenitori (con conferma e cancellazione delle note interne) tramite API (`DELETE /blocks/:id`).
    * Navigazione (React Router) a una vista di dettaglio per ogni contenitore (`/dashboard/block/:id`).
* **Vista Dettaglio Contenitore:**
    * Caricamento dei dettagli del contenitore specifico tramite API (`GET /blocks/:id`).
    * Caricamento e visualizzazione (es. in una sidebar) delle note appartenenti a quel contenitore tramite API (`GET /blocks/:id/notes`).
    * Area dedicata per la creazione/modifica di note (con titolo e contenuto testuale - `textarea`).
    * Creazione di nuove note all'interno del contenitore tramite API (`POST /blocks/:id/notes`).
    * Modifica di note esistenti tramite API (`PUT /notes/:id`).
    * Eliminazione di note specifiche tramite API (`DELETE /notes/:id`).
* **UI/UX:**
    * Componenti React funzionali con Hooks (`useState`, `useEffect`, `useRef`).
    * Notifiche utente per azioni e errori (Notistack).
    * Gestione stati di caricamento ed errore.
    * Form di Login/Registrazione modali o condizionali sulla homepage.
    * Utilizzo di icone (Iconify) e componenti UI (React Bootstrap - se usato).

## Tecnologie Utilizzate

* **Frontend:** React, React Router DOM, Notistack, Iconify, CSS / React Bootstrap (specifica se usato)
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB (presumibilmente con MongoDB Atlas)
* **Autenticazione:** JWT (jsonwebtoken), Passport.js (passport-google-oauth20), Bcrypt

## Come Iniziare (Setup Locale Esempio)

1.  Clonare la repository: `git clone [URL_TUO_REPO]`
2.  Installare le dipendenze backend: `cd backend && npm install` (o `yarn install`)
3.  Installare le dipendenze frontend: `cd ../frontend && npm install` (o `yarn install`)
4.  **Configurare le Variabili d'Ambiente:** Creare un file `.env` nella cartella `backend` basandosi su un eventuale `.env.example`. Inserire valori per:
    * `MONGO_URI`: Stringa di connessione MongoDB Atlas.
    * `JWT_SECRET`: Una stringa segreta robusta per firmare i JWT.
    * `GOOGLE_CLIENT_ID`: Il tuo Client ID da Google Cloud Console.
    * `GOOGLE_CLIENT_SECRET`: Il tuo Client Secret da Google Cloud Console.
    * `PORT`: La porta per il server backend (es. 4000).
    * `API_VERSION`: Il prefisso per le API (es. `/api/v1`).
    * `CLIENT_URL`: L'URL dove gira il frontend in sviluppo (es. `http://localhost:3000`). Necessario per i redirect OAuth e CORS.
    * `SERVER_FRONTEND` : L'Url dove e contenuto il frontend.
5.  Avviare il server backend: `cd backend && npm start` (o `npm run dev`)
6.  Avviare l'app frontend: `cd frontend && npm start` (o `vite`)
7.  Aprire il browser all'indirizzo del frontend (es. `http://localhost:3000`).
