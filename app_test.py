import psycopg2

# Configure your PostgreSQL connection here
conn = psycopg2.connect(
    host="192.168.4.59",
    port="5432",
    database="journal",
    user="jmoore",
    password="jmoore",
    connect_timeout=10
)

try:
    # Create a cursor object using the cursor() method
    cursor = conn.cursor()

    # Execute a query
    cursor.execute("SELECT * FROM posts")  # Retrieve data from table posts

    # Fetch all the rows using fetchall() method
    rows = cursor.fetchall()

    # Print each row
    for row in rows:
        print(row)

except (Exception, psycopg2.DatabaseError) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    # Close the cursor and connection
    if conn:
        cursor.close()
        conn.close()
