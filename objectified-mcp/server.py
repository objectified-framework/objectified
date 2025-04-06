from mcp.server.fastmcp import FastMCP
from datetime import datetime, timezone
import os

SSE_PATH = os.environ.get("SSE_PATH", "/mcp/sse")
MESSAGE_PATH = os.environ.get("MESSAGE_PATH", "/mcp/messages/")

mcp = FastMCP("Objectified", sse_path=SSE_PATH, message_path=MESSAGE_PATH)

@mcp.tool()
def hello() -> str:
    """Greets the user."""
    return f"Hello world!"

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
