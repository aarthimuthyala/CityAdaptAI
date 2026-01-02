from pydantic import BaseModel
from typing import Optional

# ---------------- RECOMMENDATION ----------------

class UserCreate(BaseModel):
    name: str
    location: str
    preference: str


class RecommendationResponse(BaseModel):
    recommendation: str


# ---------------- CHAT ----------------

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    type: str                      # "text" | "navigation"
    response: str                  # main message
    destination: Optional[str] = None
    maps_url: Optional[str] = None
