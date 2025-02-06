# This script handles the generation of embedding vectors into the instance_current table for each
# record stored in the database.
#
# It pulls the data record from the database using a JOIN on the instance_current table against the
# instance data.  If the embedding_time does not equal the record time (created/updated) time, the
# embedding is refreshed, and the embedding_time is updated to match the created/updated time, whichever
# is most recent.
#
# Records with an embedding_time of 0 are automatically updated for the first record entry.
#
# This library requires ollama and psycopg2 to talk to the ollama instance and PostgreSQL service respectively.

import json
import ollama
import psycopg2
from psycopg2.extras import Json

def get_db():
    connection = psycopg2.connect(
    )
    return connection

def create_embedding(payload: dict):
    try:
        payload_json = json.dumps(payload)
        response = ollama.create_embedding(payload_json)

        if 'embedding' not in response:
            print("Unable to create embedding - ollama returned no response.")
            return

        return response['embedding']
    except Exception as e:
        print(f"Error creating embedding: {e}")

