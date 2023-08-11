# SFA Backoffice Adminstration Web Application

## Developing in this Repository

Writing code and developing in this application requires running three services:

- A local Microsoft SQL Server (2019 Linux) database running in Docker
- A local Minio Object Store (S3 compatible) to store files uploaded to the application
- A local Mail Slurper SMTP endpoint for sending development emails
- The server-side Node.js application written in TypeScript: `/src/api`
- The Vue.js and Vuetify based front-end: `/src/web`

### Development Setup

1. Duplicate the `sapassword.env.sample` file to `sapassword.env` via

   ```bash
   cp sapassword.env.sample sapassword.env
   ```

2. To run the database locally, you must have Docker installed as well as Docker Compose; afterwards, run the following command from the root directory:

   ```bash
   docker compose -f docker-compose.development.yaml up -d
   ```

   or if your docker compose is old

   ```bash
   docker-compose -f docker-compose.development.yaml up -d
   ```

   This command will start API, SQL, Email, and S3 services, and bind them to appropriate ports on your local machine as specified in [docker-compose.development.yaml](./docker-compose.development.yaml).

3. When the database starts the first time, the database will be empty. To load some seed data, you must obtain a database backup, and put it into `/db/backups/sfa.bak`, then run the follow commands:

   ```bash
   dev up db
   #
   docker compose -f docker-compose.development.yaml up db
   ```

   If you need to debug the restore, you can connect to the running SQL Server via

   ```bash
   docker compose -f docker-compose.development.yaml exec -it db bash
   ```

4. The first time you start the application, you must create a bucket named `documents` and an Access Key. Copy the access key id and secret and drop those values into the appropriate spots in the environment file. The Minio Web interface located at http://localhost:9090. Subsequent starts, it is not required to access the Minio interface.

5. To preview sent emails, the MailSlurper web interface is located at http://localhost:8081.

6. To boot the api, test, db, s3 and email services you can use the docker compose setup.

   ```bash
   dev up
   # or
   docker compose -f docker-compose.development.yaml up
   ```

   If you don't use docker see the "Without Docker" section

7. Last to start is the the Vue.js web front-end. To run this, open a second terminal window at this directory and run the following commands:

   ```bash
   cd src/web
   npm install
   npm run start
   ```

   You will now have the Vue CLI server hosting the application at http://localhost:8080 and you can begin editing the API or front-end code. **All changes to the files in the `src/api` and `src/web` will automatically reload there respective applications.**

8. Manually add your user account info to the database via

   ```bash
   docker compose \
      -f docker-compose.development.yaml \
      exec -it db \
      /opt/mssql-tools/bin/sqlcmd \
         -U sa \
         -s localhost \
         -P Testing1122 \
         -d SFADB_DEV \
         -Q "INSERT INTO sfa.[USER](
               email
               , email_public
               , is_active
               , first_name
               , last_name
               , roles)
            VALUES (
               N'your.email@something.com'
               , N'your.email@something.com'
               , 1
               , N'YourFirstName'
               , N'YourLastName'
               , N'Admin');"
   ```

9. You should now be able to log in at http://localhost:8080, assuming you have an appropriate Auth0 or YNet account.

---

To access the Database console directly use:

```bash
docker compose -f docker-compose.development.yaml exec db /opt/mssql-tools/bin/sqlcmd -U sa -s localhost -P Testing1122
```

#### Without Docker

1. Install `asdf` using instructions at https://asdf-vm.com/guide/getting-started.html.

2. Install the `nodejs` plugin via and the appropriate nodejs version.

   ```bash
   asdf plugin add nodejs
   asdf install nodejs # installs the version from the .tool-verions file
   ```

   Check that you have the correct version set up by verifying that these two commands match:

   ```bash
   asdf current nodejs
   node -v
   ```

3. (optional) You will now have a local database with data ready for the API. To run the API, run the following commands:

   ```bash
   cd src/api
   npm install
   ```

> You no longer need this step if you are using docker compose.

10. You must then duplicated the `.env.sample` to `.env.development` and update the appropriate values for the local database and authentication. You will need to set the `DB_PASS` equal to the value of the `MSSQL_SA_PASSWORD` in the `db/sapassword.env`.

    ```bash
    cp .env.sample .env.development
    ```

11. (optional) Start the Node.js API with:

    ```bash
    npm run start
    ```

    The API will bind to your local machines port 3000 and be available at http://localhost:3000

> You no longer need this step if you are using docker compose.

## Dev Command Usage

If you want a simpler interface to interact with docker compose you can use the `bin/dev` helper.

It requires ruby which you can install via

```bash
asdf plugin add ruby
asdf install ruby
```

The `dev` command is usually set up in conjunction with `direnv` (https://direnv.net/) via
creating a `.envrc` file at the root of your project.

```bash
#!/usr/bin/env bash

PATH_add bin
```

After which you can use the `dev` command like so:

- `dev build` builds all services in the docker-compose.development.yaml file
- `dev up` boots all services in the docker-compose.development.yaml file and watches the logs
- `dev down` stops all services in the docker-compose.development.yaml file
- `dev logs` follows logs for all services in the docker-compose.development.yaml file
- `dev sh` runs the api service and loads and sh shell.
- `dev npm xxx` runs the api service and and executes and npm command
- `dev sqlcmd` opens an sql terminal into the DB container
- `dev debug` will open a debug console against the api container and wait for a breakpoint to trigger

Most of these commands are composable and accept any args that you could pass to the normal docker compose command.
e.g

- `dev up db` will only boot the db service
- `dev build api` will only build the api service
- `dev logs api` will only watch logs for the api service

### Helpful Customizations

- `API_PORT=3100 dev up` will boot the api service on port 3100 with a base url to match.

## Contributing code

To process to contribute code to this repository is via pull requests initiated from a forked copy of this repository.

Steps:

- In your browser, open https://github.com/ytgov/sfa-client/fork
- Fork the repo into your own namespace
- Do your work!
- Ensure the app builds: `docker-compose build`
- Before a pull request is created, sync your branch with upstream using the GitHub sync function
- Create a pull request from your branch to ytgov/sfa-client:test (upstream)
- The pull request will be reviewed and approved or rejected
  - If conflicts exist, the PR will be rejected
  - You then need to rebase from upstream and resolve conflicts then resubmit your PR

---

## Deployment

### Production

Since the database for this system is managed externally, PRODUCTION version only needs to run the API and Web services.

The [Dockerfile](./Dockerfile) in this directory builds the Vue.js web front-end, and serves the compiled files via the Node.js API, so only one container is required to serve the front-end and back-ends; thus saving resources.

On the PRODUCTION server, the application is run via `docker compose`, so the code needs to be cloned to the server and the appropriate environment variables set using the following commands:

```
cp /src/api/.env /src/api/.env.production
vi /src/api/.env.production
```

You now can use vi or nano or other tool to set the environment variables before starting the application with:

```
docker compose up --build -d
```

When you look at the running Docker containers using `docker ps`, you should see a container named `sfa-client_web_1`.

```

**One thing to keep in mind is that the port in the `docker-compose.prodution.yml` may need to be changed depending the the reverse proxy setups.**
```

#### Testing Production Build Locally

You can boot the production environment locally via:

1. Making a production config.

   ```bash
   cp ./src/api/.env.development ./src/api/.env.production
   ```

2. Setting the `DB_HOST` to `db`

3. Setting the `FRONTEND_URL` to `http://localhost:3000`

4. Setting the `AUTH_REDIRECT` to `http://localhost:3000/dashboard`

5. Booting the development database.

   ```bash
   dev up db

   # Or
   docker compose -f docker-compose.development.yaml up --remove-orphans db
   ```

6. Booting the production build of the app.

   ```bash
   docker compose up --build
   ```

   > Note that you must always boot the production app after booting the database.

7. Log in to the app at http://localhost:3000/dashboard.

### User Acceptance Testing (UAT)

Jenkins pipeline [Jenkinsfile](./Jenkinsfile) builds and deploys.
TODO: add more information
