from pydantic_settings import BaseSettings  # Updated import

class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str

    class Config:
        env_file = ".env"  # Load environment variables from the .env file

settings = Settings()