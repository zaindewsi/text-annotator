# Text Annotator

## Get Started

- Fork and/or clone this repository.

### Server Setup

- Create the database with your PSQL user

  `CREATE DATABASE text_annotator_api;`

- Import tables and seeds

  ` \c text_annotator_api;`

  ` \i server/db.sql;`

- Copy the .env.example file to create a .env with the correct DB credentials

- Install dependencies and start the server

`cd server`

`npm install`.

`npm start` or `npm run dev` for nodemon. The api will be served at <http://localhost:5000/api/snippets>.

### Client Setup

- Install dependencies and start the server

`cd client`

`npm install`.

`npm start` The frontend will be served at <http://localhost:3000>.
