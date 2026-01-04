from sqlalchemy.orm import Session
from .models import ChatHistory
from .learning import extract_topic


def save_chat(
    db: Session,
    user_id: str,
    role: str,
    message: str,
    topic: str = "general"
):
    chat = ChatHistory(
        user_id=user_id,
        role=role,
        message=message,
        topic=topic
    )
    db.add(chat)
    db.commit()
