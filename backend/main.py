from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Schema (Pydantic)
class LogSchema(BaseModel):
    test_name: str
    bug_status: str
    result: str
    error_category: Optional[str]
    test_details: Optional[str]
    game_version: Optional[str]
    tester: Optional[str]
    config: Optional[str]
    comment: Optional[str]
    time: datetime

    class Config:
        orm_mode = True


class LogCreate(BaseModel):
    test_name: str
    bug_status: str
    result: str
    error_category: str
    test_details: str
    game_version: str
    tester: str
    config: str
    comment: Optional[str] = None
    time: datetime

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint – get all logs (z Pydantic schema, w ustalonej kolejności)
@app.get("/logs", response_model=List[LogSchema])
def get_logs(db: Session = Depends(get_db)):
    logs = db.query(models.Log).all()
    return logs

# Endpoint – add log
@app.post("/logs", response_model=LogSchema)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    db_log = models.Log(
        test_name=log.test_name,
        bug_status=log.bug_status,
        result=log.result,
        error_category=log.error_category,
        test_details=log.test_details,
        game_version=log.game_version,
        tester=log.tester,
        config=log.config,
        comment=log.comment,
        time=log.time,
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# Endpoint – delete log
@app.delete("/logs/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(models.Log).filter(models.Log.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log nie znaleziony")
    db.delete(log)
    db.commit()
    return {"message": "Log usunięty"}