from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from models import Log
from database import SessionLocal, engine
from database import init_db

app = FastAPI()

# CORS (dla komunikacji z frontendem)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Możesz podać konkretny frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemat danych wejściowych
class LogCreate(BaseModel):
    test_name: str
    result: str
    time: datetime

# Dependency: sesja DB
async def get_db():
    async with SessionLocal() as session:
        yield session

@app.on_event("startup")
async def on_startup():
    await init_db()

# Endpoint: dodawanie loga
@app.post("/logs")
async def create_log(log: LogCreate, db: AsyncSession = Depends(get_db)):
    db_log = Log(**log.dict())
    db.add(db_log)
    await db.commit()
    await db.refresh(db_log)
    return {"message": "Log added", "log": log}

# Endpoint: pobieranie wszystkich logów
@app.get("/logs")
async def read_logs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Log))
    logs = result.scalars().all()
    return logs