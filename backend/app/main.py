from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from .models import Base, User
from .schemas import (
    UserCreate,
    RecommendationResponse,
    ChatRequest,
    ChatResponse
)
from .crud import save_chat
from .memory import get_user_topics
from .recommender import generate_recommendation
from .agent import run_city_agent
from .config import APP_NAME, VERSION

# -------------------------------------------------
# DB INIT
# -------------------------------------------------
Base.metadata.create_all(bind=engine)

# -------------------------------------------------
# APP INIT
# -------------------------------------------------
app = FastAPI(
    title=APP_NAME,
    version=VERSION,
    description="CityAdaptAI – AI-powered Smart City Recommendation & Agent System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # dev mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# DB DEPENDENCY
# -------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =================================================
# CHAT WITH AI AGENT (LEARNING ENABLED)
# =================================================
@app.post("/chat", response_model=ChatResponse)
def chat_with_agent(
    chat: ChatRequest,
    db: Session = Depends(get_db)
):
    user_id = "default_user"

    save_chat(db, user_id, "user", chat.message)

    ai_reply = run_city_agent(chat.message)

    save_chat(db, user_id, "assistant", ai_reply["response"])

    return ChatResponse(**ai_reply)




# =================================================
# RECOMMENDATION ENDPOINT (PERSONALIZED)
# =================================================
@app.post("/recommend", response_model=RecommendationResponse)
def recommend(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Traditional recommendation + learning-aware
    """
    user_id = "default_user"

    # Save user profile
    new_user = User(
        name=user.name,
        location=user.location,
        preference=user.preference
    )
    db.add(new_user)
    db.commit()

    # Use memory to improve recommendation
    user_topics = get_user_topics(db, user_id)

    recommendation = generate_recommendation(
        user=user,
        db=db,
        user_id=user_id,
        learned_topics=user_topics
    )

    return RecommendationResponse(recommendation=recommendation)
