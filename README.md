# Product-Overview

## Info
  Product-Overview is the backend/server part of a larger group of api's for a clothing website. This server serves as an API for hundreds of thousands of products, including styles, features, photos, SKUs, and relations. It is currently a work in progress and may not be fully functional.

##API Endpoints
None for now [in progress]

## Technologies Used
*Docker
*Postgres
*Express
*Node.js
*jest

##Installation [To make your own api]
To install the project and its dependencies, follow these steps:

1.Clone the repo
2.In the terminal run npm install
3.Install docker onto your system
4.Create a .env file and fill in these values for you authentication
PORT=
PG_CONTAINER_NAME=
POSTGRESUSR=
POSTGRESPASS=
PGDATABASE=
POSTGRESPORT=

5.In your terminal run the command docker compose up -d [this will start your postgres server]
6.Create your tables and import data as needed.
