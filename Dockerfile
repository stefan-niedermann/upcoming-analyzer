FROM nginx:alpine-slim

MAINTAINER Niedermann IT <info@niedermann.it>

COPY ./dist /usr/share/nginx/html
