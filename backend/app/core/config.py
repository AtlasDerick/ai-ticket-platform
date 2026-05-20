from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME = "AI Ticket Intelligence Platform"
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    DATABASE_URL = os.getenv("DATABASE_URL")

settings = Settings()