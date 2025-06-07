from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Middleware dla CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemat logu (Pydantic)
class LogCreate(BaseModel):
    test_name: str
    result: str
    error_category: str = None
    test_details: str = None
    game_version: str = None
    tester: str = None
    config: str = None
    bug_status: str = None
    comment: str = None
    time: datetime

# Dependency do sesji
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint – pobierz wszystkie logi
@app.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    logs = db.query(models.Log).all()
    return logs

# Endpoint – dodaj log
@app.post("/logs")
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    db_log = models.Log(
        test_name=log.test_name,
        result=log.result,
        error_category=log.error_category,
        test_details=log.test_details,
        game_version=log.game_version,
        tester=log.tester,
        config=log.config,
        bug_status=log.bug_status,
        comment=log.comment,
        time=log.time,
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# Endpoint – usuń log
@app.delete("/logs/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(models.Log).filter(models.Log.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log nie znaleziony")
    db.delete(log)
    db.commit()
    return {"message": "Log usunięty"}
