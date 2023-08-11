FROM mcr.microsoft.com/mssql/server:2019-latest

# current user:group => $whoami:$(id -gn) => mssql:root
USER root
RUN mkdir -p /usr/src/db && chown mssql:root /usr/src/db
USER mssql

WORKDIR /usr/src/db

# Data
# COPY ./db/log /var/opt/mssql/log
COPY ./db/backups /var/opt/mssql/data/backups

# Intialization
COPY --chown=mssql:root --chmod=+x ./db/entrypoint.sh ./
COPY --chown=mssql:root --chmod=+x ./db/bin ./bin
COPY --chown=mssql:root ./db/initializers ./initializers

ENTRYPOINT ["/usr/src/db/entrypoint.sh"]
