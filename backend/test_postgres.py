import os
import psycopg2
from urllib.parse import urlparse
import ssl
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get database connection string from environment variable
conn_string = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost/dbname')

try:
    print('Attempting to connect to PostgreSQL...')

    # Connect to the database
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()

    print('Connection established!')

    # Execute a simple query to test the connection
    cur.execute('SELECT version();')
    db_version = cur.fetchone()
    print(f'Database version: {db_version[0]}')

    # List tables to see what's available
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cur.fetchall()
    if tables:
        print(f'Available tables: {[table[0] for table in tables]}')
    else:
        print('No tables found in the public schema.')

    # Check if our expected tables exist
    expected_tables = ['users', 'modules', 'module_progress', 'personalization', 'counters', 'partners', 'access_logs', 'chat_history']
    print(f'\nChecking for expected tables...')
    for table in expected_tables:
        cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s);", (table,))
        exists = cur.fetchone()[0]
        status = "[EXISTS] " if exists else "[MISSING] "
        print(f'  {table}: {status}')

    cur.close()
    conn.close()
    print('\nConnection closed successfully.')

except psycopg2.Error as e:
    print(f'PostgreSQL error: {e}')
except Exception as e:
    print(f'Error connecting to PostgreSQL: {e}')
    import traceback
    traceback.print_exc()