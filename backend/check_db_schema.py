import psycopg2
from config.settings import settings

def check_users_table():
    try:
        # Connect to the database
        conn = psycopg2.connect(settings.DATABASE_URL)
        cur = conn.cursor()
        
        # Get column names from users table
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'")
        columns = cur.fetchall()
        
        print("Columns in 'users' table:")
        for col in columns:
            print(f"  - {col[0]}")
            
        conn.close()
    except Exception as e:
        print(f"Error checking database schema: {e}")

if __name__ == "__main__":
    check_users_table()