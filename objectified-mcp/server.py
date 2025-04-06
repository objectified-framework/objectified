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
    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        raise Exception(f"Error connecting to database: {str(e)}")

def run_query(conn: psycopg2.extensions.connection, query: str,
              params: Optional[tuple] = None) -> List[Dict[str, Any]]:
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params)
            results = cursor.fetchall()
            return [dict(row) for row in results]
    except Exception as e:
        conn.rollback()
        raise Exception(f"Error executing query: {str(e)}")
    finally:
        conn.close()

@mcp.tool()
async def hello() -> str:
    """Greets the user."""
    print("Hello World")
    return f"Hello world!"

@mcp.resource("classes://{name}/by_name")
async def get_class_ids_by_name(name: str) -> list[str]:
    """Retrieves a list of classes by ID based on the name specified"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id FROM obj.class WHERE name LIKE %s", (f"%{name}%",))
    print(f"[get_class_ids_by_name]: search={name} results={len(results)}")
    result_list = [row["id"] for row in results] if len(results) > 0 else []
    return result_list

@mcp.resource("classes://{id}/by_id")
async def get_class_by_id(id: str) -> list[str]:
    """Retrieves class information by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    result = run_query(conn, "SELECT * FROM obj.class WHERE id=%s", (id,))
    print(f"[get_class_by_id]: id={id} result={result}")
    return result if len(result) > 0 else "{}"

if __name__ == "__main__":
    print("""
 ██████  ██████       ██ ███████  ██████ ████████ ██ ███████ ██ ███████ ██████
██    ██ ██   ██      ██ ██      ██         ██    ██ ██      ██ ██      ██   ██
██    ██ ██████       ██ █████   ██         ██    ██ █████   ██ █████   ██   ██
██    ██ ██   ██ ██   ██ ██      ██         ██    ██ ██      ██ ██      ██   ██
 ██████  ██████   █████  ███████  ██████    ██    ██ ██      ██ ███████ ██████
""")
    print(f"Starting server:\n  SSE_PATH={SSE_PATH}\n  MESSAGE_PATH={MESSAGE_PATH}\n  DATABASE_URL={DATABASE_URL}")
    mcp.run(transport="sse")
