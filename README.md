# SFA Backoffice Adminstration Web Application

## Developing in this Repository

Writing code and developing in this application requires running three services:

- A local Microsoft SQL Server (2019 Linux) database running in Docker
- The server-side Node.js application written in TypeScript: `/src/api`
- The Vue.js and Vuetify based front-end: `/src/web`

### Development Setup

To run the database locally, you must have Docker installed as well as Docker Compose, then run the following command from the root directory:

```
docker-compose -f docker-compose.dev.yml up -d
```

This command will start SQL Server and bind it to your local machine's port 1433. When it starts the first time, the database will be empty. To load it with data, you must obtain a database backup and put it into `/db/backups/sfa.bak` then run the follow commands:

```
docker exec -it sfa-client_sql_1 bash
```

This connects you to the running SQL Server container. Once in, run the following commands to create and restore the database from the backup:

```
cd /opt/mssql-tools/bin
./sqlcmd -U sa -s localhost -P Testing1122 -Q "RESTORE DATABASE SFADB_DEV FROM DISK = N'/backups/sfa.bak' WITH FILE = 1"
```

You will now have a local database with data ready for the API. To run the API, run the following commands:

```
cd src/api
npm install
cp .env .env.development
```

You must then edit the `.env.development` file with the appropriate values for the local database and authentication before starting the Node.js API with:

```
npm run start
```

The API will bind to your local machines port 3000 and be available at http://localhost:3000

Last to start is the the Vue.js web front-end. To run this, open a second terminal window at this directory and run the following commands:

```
cd src/web
npm install
npm run start
```

You will now have the Vue CLI server hosting the application at http://localhost:8080 and you can begin editing the API or front-end code. **All changes to the files in the `src/api` and `src/web` will automatically reload theie respective applications.**

--- 

## Contributing code

To process to contribute code to this repository is via pull requests initiated from a forked copy of this repository.

Steps:

 - In your browser, open https://github.com/ytgov/sfa-client/fork
 - Fork the repo into your own namespace
 - Do your work!
 - Ensure the app builds: `docker-compose build`
 - Create a pull request from your branch to ytgov/sfa-client:test (upstream)
 - The pull request will be reviewed and approved or rejected
   - If conflicts exist, the PR will be rejected
   - You then need to rebase from upstream and resolve conflicts then resubmit your PR

--- 

## Running the application in production

Since the database for this system is managed externally, PRODUCTION version only needs to run the API and Web services.
The `Dockerfile` in this directory builds the Vue.js web front-end, and serves the compiled files via the Node.js API,
so only one container is required to serve the front-end and back-ends; thus saving resources.

On the PRODUCTION server, the application is run via docker-compose, so the code needs to be cloned to the server and
the appropriate environment variables set using the following commands:

```
cp /src/api/.env /src/api/.env.production
vi /src/api/.env.production
```

You now can use vi or nano or other tool to set the environment variables before starting the application with:

```
docker-compose -f docker-compose.production.yml up --build -d
```

When you look at the running Docker containers using `docker ps`, you should see a container named `sfa-client_web_1`.

```

**One thing to keep in mind is that the port in the `docker-compose.prodution.yml` may need to be changed
depending the the reverse proxy setups.**
```
