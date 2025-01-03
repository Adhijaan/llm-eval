# config.py
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import supabase
import os

# Load environment variables from .env file
load_dotenv()



SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
def get_supabase_client():
    return supabase_client



# # Supabase connection details
# DB_USER = os.getenv("USER")
# DB_PASSWORD = os.getenv("PASSWORD")
# DB_HOST = os.getenv("HOST")
# DB_PORT = os.getenv("PORT")
# DB_NAME = os.getenv("DBNAME")

# # Construct the DATABASE_URL
# DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# # SQLAlchemy Engine with connection pooling
# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True,  # Ensures dead connections are discarded
#     pool_size=10,        # Number of connections in the pool
#     max_overflow=20,     # Additional connections beyond pool_size
#     connect_args={"sslmode": "require"}  # Enforce SSL for Supabase
# )

# # Create a configured SessionLocal class
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for SQLAlchemy models
# Base = declarative_base()
