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
async def get_data_types() -> list[str]:
    """Retrieves a list of all available data types"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT * FROM obj.data_type WHERE enabled")
    print(f"[get_data_types]: results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def list_classes(tenant_id: str) -> list[str]:
    """Retrieves a list of all classes available to a tenant by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id, name FROM obj.class WHERE tenant_id=%s", (tenant_id, ))
    print(f"[list_classes]: tenant_id={tenant_id} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_class_ids_by_name(tenant_id: str, name: str) -> list[str]:
    """Retrieves a list of classes by ID based on the name specified"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id FROM obj.class WHERE name LIKE %s AND tenant_id=%s", (f"%{name}%", tenant_id))
    print(f"[get_class_ids_by_name]: tenant_id={tenant_id} search={name} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_class_by_id(tenant_id: str, id: str) -> list[str]:
    """Retrieves class information by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    result = run_query(conn, "SELECT * FROM obj.class WHERE id=%s AND tenant_id=%s", (id, tenant_id))
    print(f"[get_class_by_id] tenant_id={tenant_id} id={id}")
    return result if len(result) > 0 else "{}"

@mcp.tool()
async def get_schema_by_id(tenant_id: str, id: str) -> list[str]:
    """Retrieves class JSON Schema by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    result = run_query(conn, "SELECT schema FROM obj.class_schema WHERE class_id=%s AND tenant_id=%s", (id, tenant_id))
    print(f"[get_schema_by_id] tenant_id={tenant_id} id={id}")
    return result if len(result) > 0 else "{}"

@mcp.tool()
async def list_fields(tenant_id: str) -> list[str]:
    """Retrieves a list of all fields for a tenant by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id, name FROM obj.field WHERE tenant_id=%s", (tenant_id, ))
    print(f"[list_fields]: tenant_id={tenant_id} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_fields_by_name(tenant_id: str, name: str) -> list[str]:
    """Retrieves a list of fields by ID and name based on the name specified"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id, name FROM obj.field WHERE name LIKE %s AND tenant_id=%s", (f"%{name}%", tenant_id))
    print(f"[get_fields_by_name]: tenant_id={tenant_id} search={name} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_field_by_id(tenant_id: str, id: str) -> list[str]:
    """Retrieves field information by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    result = run_query(conn, "SELECT * FROM obj.field WHERE id=%s AND tenant_id=%s", (id, tenant_id))
    print(f"[get_field_by_id] tenant_id={tenant_id} id={id}")
    return result if len(result) > 0 else "{}"

@mcp.tool()
async def list_properties(tenant_id: str) -> list[str]:
    """Retrieves a list of all fields for a tenant by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id, name FROM obj.property WHERE tenant_id=%s", (tenant_id, ))
    print(f"[list_properties]: tenant_id={tenant_id} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_properties_by_name(tenant_id: str, name: str) -> list[str]:
    """Retrieves a list of properties by ID and name based on the name specified"""
    conn = connect_to_postgres(DATABASE_URL)
    results = run_query(conn, "SELECT id, name FROM obj.property WHERE name LIKE %s AND tenant_id=%s", (f"%{name}%", tenant_id))
    print(f"[get_properties_by_name]: tenant_id={tenant_id} search={name} results={len(results)}")
    return results if len(results) > 0 else []

@mcp.tool()
async def get_property_by_id(tenant_id: str, id: str) -> list[str]:
    """Retrieves property information by ID"""
    conn = connect_to_postgres(DATABASE_URL)
    result = run_query(conn, "SELECT * FROM obj.property WHERE id=%s AND tenant_id=%s", (id, tenant_id))
    print(f"[get_property_by_id] tenant_id={tenant_id} id={id}")
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
