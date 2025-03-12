# config.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()



# Supabase (Postgres) connection details
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# Construct the DATABASE_URL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SQLAlchemy Engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Ensures dead connections are discarded
    pool_size=15,        
    max_overflow=10,     
    connect_args={
        "sslmode": "require",                   # Enforce SSL for Supabase
        "options": "-c pool_mode=transaction"   # Set pool_mode to 'transaction'
        }  
)

# Create a configured SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for SQLAlchemy models
Base = declarative_base()



# import supabase
# SUPABASE_URL = os.getenv("SUPABASE_URL")
# SUPABASE_KEY = os.getenv("SUPABASE_KEY")
# supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
# def get_supabase_client():
#     return supabase_client