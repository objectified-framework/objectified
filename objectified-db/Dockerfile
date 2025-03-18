FROM ruby:3.1.2-alpine

RUN mkdir objectified-db
COPY . objectified-db

# Install the Postgres client
RUN apk --update add postgresql-client

# install the schema evolution manager (see README.md)
RUN gem install schema-evolution-manager
