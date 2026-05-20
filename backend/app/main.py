from fastapi import FastAPI

from app.api.routes import health
from app.db.session import engine, Base
from app.models import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Ticket Intelligence Platform",
    version="1.0.0"
)

app.include_router(health.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}