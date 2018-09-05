# Note: multi-stage build, requires Docker 17.05+ (released in May 2017)

FROM node:9.2.0-alpine
COPY ./ /app/
WORKDIR /app
RUN echo "Installing node packages ..." && npm install
RUN echo "Building app..."              && export CI=true && npm run build
RUN echo "Removing temp files..."       && rm -rf node_modules src public package.json Dockerfile .dockerignore


MAINTAINER Devis Lucato (https://github.com/dluc)

LABEL Tags="Azure,IoT,Solutions,React,SPA"

ARG user=app

RUN addgroup $user && adduser -D -G $user $user

COPY ./.env /app
COPY ./package.json /app
COPY src/ /app/src
COPY public/ /app/public
COPY scripts/docker/content/run.sh /app
COPY scripts/docker/content/nginx.conf /app
WORKDIR /app

RUN echo "Installing web server..." \
 && apk add --no-cache nginx \
 && mkdir /app/logs \
 && chown -R $user:$user /app \
 && mkdir -p /var/lib/nginx /var/cache/nginx /var/tmp/nginx /var/log/nginx \
 && chown -R $user:$user /var/lib/nginx /var/cache/nginx /var/tmp/nginx /var/log/nginx \
 && echo "Removing unused files..." \
 && apk del --force --purge alpine-keys apk-tools \
 && rm -rf /var/cache/apk /etc/apk /lib/apk

EXPOSE 10080 10443
VOLUME /app/logs

ENTRYPOINT ["/bin/sh", "/app/run.sh"]

USER $user
