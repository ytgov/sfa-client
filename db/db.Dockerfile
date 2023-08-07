FROM mcr.microsoft.com/mssql/server:2019-latest

# current user:group => $whoami:$(id -gn) => mssql:root
USER root

RUN mkdir -p /usr/config

WORKDIR /usr/config

COPY . .

RUN chown -R mssql:root /usr/config
RUN chmod +x ./entrypoint.sh
RUN chmod +x ./configure-db.sh

USER mssql

ENTRYPOINT ["./entrypoint.sh"]
