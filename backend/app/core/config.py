from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME = "AI Ticket Intelligence Platform"

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
    AI_SUMMARY_PROMPT = os.getenv(
        "AI_SUMMARY_PROMPT",
        (
            "You are an expert support operations analyst. Summarize the ticket "
            "description in 3 concise bullet points: customer problem, likely impact, "
            "and recommended next action. Keep the summary factual and do not invent details."
        )
    )
    DATABASE_URL = os.getenv("DATABASE_URL")

    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60

settings = Settings()
