from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from .database import Base

# -----------------------------------
# USER TABLE
# -----------------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    preference = Column(String, nullable=False)

# -----------------------------------
# CHAT HISTORY (LEARNING MEMORY)
# -----------------------------------
class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    role = Column(String)              # user | assistant
    message = Column(String)
    topic = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
