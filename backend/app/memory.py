from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import datetime, timedelta

from .models import ChatHistory


def get_user_topics(
    db: Session,
    user_id: str,
    limit: int = 5,
    recent_days: int = 30
):
    """
    Returns user topics ranked by importance.

    Improvements:
    - Recent chats weighted more
    - Old/noise topics reduced
    - Confidence score per topic
    """

    # 🔁 Consider only recent conversations
    since = datetime.utcnow() - timedelta(days=recent_days)

    rows = (
        db.query(ChatHistory.topic)
        .filter(ChatHistory.user_id == user_id)
        .filter(ChatHistory.timestamp >= since)
        .all()
    )

    if not rows:
        return []

    # 📊 Frequency calculation
    freq = {}
    for r in rows:
        topic = r.topic or "general"
        freq[topic] = freq.get(topic, 0) + 1

    total = sum(freq.values())

    # 🧠 Convert to ranked topics with confidence
    ranked_topics = [
        {
            "topic": topic,
            "confidence": round(count / total, 2)
        }
        for topic, count in freq.items()
    ]

    # 🔽 Sort by confidence
    ranked_topics.sort(
        key=lambda x: x["confidence"],
        reverse=True
    )

    return ranked_topics[:limit]


def get_last_event(db: Session, user_id: str):
    return (
        db.query(ChatHistory)
        .filter(
            ChatHistory.user_id == user_id,
            ChatHistory.topic == "events"
        )
        .order_by(ChatHistory.created_at.desc())
        .first()
    )