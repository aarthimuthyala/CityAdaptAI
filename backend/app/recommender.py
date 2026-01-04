from .ml_model import hybrid_recommendation
from .memory import get_user_topics

def generate_recommendation(user, db=None, user_id=None):

    if db and user_id:
        topics = get_user_topics(db, user_id)

        if topics:
            top = topics[0]

            # 🔒 Confidence threshold
            if top["confidence"] >= 0.4:
                return hybrid_recommendation(
                    user_preference=top["topic"],
                    user_location=user.location
                )

    # 🔁 Fallback
    return hybrid_recommendation(
        user_preference=user.preference.lower(),
        user_location=user.location
    )
