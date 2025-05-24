from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

# Ustawienia CORS - tu wpisz adres(y) frontendów, które będą się łączyć
origins = [
    "https://laughing-space-winner-x5r6wqqx5rwjfrxw-3000.app.github.dev",  # przykład GitHub Codespaces frontend
    "http://localhost:3000",  # lokalny frontend (jeśli używasz)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # lub ["*"] dla testów (uwaga: ryzykowne w produkcji)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model danych logu
class LogEntry(BaseModel):
    test_name: str
    result: str
    time: datetime

# Przechowywanie logów w pamięci (na czas działania aplikacji)
logs: List[LogEntry] = []

@app.post("/logs")
async def post_log(log: LogEntry):
    logs.append(log)
    return {"message": "Log zapisany"}

@app.get("/logs", response_model=List[LogEntry])
async def get_logs():
    return logs

# Opcjonalnie endpoint testowy
@app.get("/")
async def root():
    return {"message": "Backend działa"}