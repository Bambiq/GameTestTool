from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    test_name = Column(String, nullable=False)
    bug_status = Column(String, nullable=False)
    result = Column(String, nullable=False)
    error_category = Column(String, nullable=False)
    test_details = Column(String, nullable=False)
    game_version = Column(String, nullable=False)
    tester = Column(String, nullable=False)
    config = Column(String, nullable=False)
    comment = Column(String, nullable=False)
    time = Column(DateTime, default=datetime.now)