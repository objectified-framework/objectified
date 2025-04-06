import psycopg2
import os
from mcp.server.fastmcp import FastMCP
from datetime import datetime, timezone
from psycopg2.extras import RealDictCursor
from typing import List, Dict, Any, Optional

DATABASE_URL = os.environ.get("DATABASE_URL")
SSE_PATH = os.environ.get("SSE_PATH", "/mcp/sse")
MESSAGE_PATH = os.environ.get("MESSAGE_PATH", "/mcp/messages/")

mcp = FastMCP("Objectified", sse_path=SSE_PATH, message_path=MESSAGE_PATH)

def connect_to_postgres(database_url: str) -> psycopg2.extensions.connection:
    """
    Establishes a connection to a PostgreSQL database using a DATABASE_URL.

    Args:
        database_url (str): The PostgreSQL connection string in URL format
                           (e.g., 'postgresql://username:password@hostname:port/database')

    Returns:
        psycopg2.extensions.connection: A connection object to the PostgreSQL database

    Raises:
        Exception: If connection fails
    """
    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        raise Exception(f"Error connecting to PostgreSQL database: {str(e)}")

def run_query(conn: psycopg2.extensions.connection, query: str,
              params: Optional[tuple] = None) -> List[Dict[str, Any]]:
    """
    Executes a SQL query and returns all results.

    Args:
        conn (psycopg2.extensions.connection): PostgreSQL connection object
        query (str): SQL query to execute
        params (tuple, optional): Parameters to be used with the query for safe parameterization

    Returns:
        List[Dict[str, Any]]: List of dictionaries, where each dictionary
                             represents a row with column names as keys

    Raises:
        Exception: If query execution fails
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params)
            results = cursor.fetchall()
            return [dict(row) for row in results]
    except Exception as e:
        conn.rollback()
        raise Exception(f"Error executing query: {str(e)}")
    finally:
        # We don't close the connection here to allow for multiple queries
        # with the same connection. The caller should close it when done.
        pass

@mcp.tool()
def hello() -> str:
    """Greets the user."""
    return f"Hello world!"

@mcp.resource("classes://{name}/by_name")
def get_classes_by_name(name: str) -> list[str]:
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id FROM obj.class WHERE name LIKE %s", (f"%{name}%",))
    result_list = [row["id"] for row in results] if len(results) > 0 else []
    return result_list

if __name__ == "__main__":
    print("""
 ██████  ██████       ██ ███████  ██████ ████████ ██ ███████ ██ ███████ ██████
██    ██ ██   ██      ██ ██      ██         ██    ██ ██      ██ ██      ██   ██
██    ██ ██████       ██ █████   ██         ██    ██ █████   ██ █████   ██   ██
██    ██ ██   ██ ██   ██ ██      ██         ██    ██ ██      ██ ██      ██   ██
 ██████  ██████   █████  ███████  ██████    ██    ██ ██      ██ ███████ ██████
""")
    print(f"Starting server: SSE_PATH={SSE_PATH} MESSAGE_PATH={MESSAGE_PATH}")
    mcp.run(transport="sse")
