FROM python:3

RUN mkdir objectified-mcp
COPY server.py objectified-mcp
COPY run.sh objectified-mcp
WORKDIR /objectified-mcp
RUN pip install mcp psycopg2-binary
ENTRYPOINT ./run.sh

