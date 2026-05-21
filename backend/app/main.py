from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import ai, auth, health, tickets
from app.db.session import engine, Base
from app.models import Ticket, User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Ticket Intelligence Platform",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(tickets.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "AI platform connected successfully!"}
