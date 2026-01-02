import os
import re
import json
from urllib.parse import quote_plus
from dotenv import load_dotenv
from groq import Groq

from .ml_model import hybrid_recommendation
from .data import load_city_services_data, load_hyderabad_areas

# -------------------------------------------------
# INIT
# -------------------------------------------------
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

areas_df = load_hyderabad_areas()

# -------------------------------------------------
# SYSTEM PROMPT
# -------------------------------------------------
SYSTEM_PROMPT = """
You are CityAdaptAI, a smart city assistant for Hyderabad.

TASKS:
1. Understand user intent deeply.
2. Detect navigation, transport, health, events.
3. Be concise, factual, and helpful.

Respond ONLY in valid JSON:
{
  "intent": "event | transport | health | chat | data",
  "location": "area name or unknown",
  "confidence": 0.0,
  "reply": "short response"
}
"""

# -------------------------------------------------
# NAVIGATION INTENT DETECTION
# -------------------------------------------------
def detect_navigation_intent(message: str):
    patterns = [
        r"navigate to (.+)",
        r"go to (.+)",
        r"directions to (.+)",
        r"take me to (.+)"
    ]
    for pattern in patterns:
        match = re.search(pattern, message.lower())
        if match:
            return match.group(1).strip()
    return None

# -------------------------------------------------
# MAIN AGENT
# -------------------------------------------------
def run_city_agent(user_message: str) -> dict:
    try:
        # -------------------------------------------------
        # NAVIGATION HANDLER (FAST, NO LLM)
        # -------------------------------------------------
        destination = detect_navigation_intent(user_message)
        if destination:
            area_match = areas_df[
                areas_df["mandal"].str.lower() == destination.lower()
            ]

            if area_match.empty:
                return {
                    "type": "text",
                    "response": "❌ I couldn’t find that area in Hyderabad."
                }

            maps_url = (
                "https://www.google.com/maps/dir/?api=1&destination="
                + quote_plus(f"{destination}, Hyderabad")
            )

            return {
                "type": "navigation",
                "response": f"📍 Navigating to {destination}",
                "destination": destination,
                "maps_url": maps_url
            }

        # -------------------------------------------------
        # LLM INTENT UNDERSTANDING
        # -------------------------------------------------
        ai = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.2,
        )

        ai_json = json.loads(ai.choices[0].message.content)

        intent = ai_json.get("intent", "chat")
        confidence = float(ai_json.get("confidence", 0))
        reply = ai_json.get("reply", "")

        if confidence < 0.6:
            return {
                "type": "text",
                "response": "🤖 Could you please clarify your request?"
            }

        # -------------------------------------------------
        # EVENT RECOMMENDATION (LEGAL, REFERRAL-BASED)
        # -------------------------------------------------
        if intent == "event":
            events = [
                {
                    "title": "Hyderabad Music Night",
                    "venue": "HICC",
                    "date": "2025-02-20",
                    "source": "BookMyShow",
                    "url": "https://in.bookmyshow.com/explore/events-hyderabad",
                },
                {
                    "title": "Startup Networking Meetup",
                    "venue": "T-Hub",
                    "date": "2025-02-18",
                    "source": "District",
                    "url": "https://www.district.in/events/",
                },
            ]

            response_text = "\n\n".join(
                f" {e['title']}\n"
                f" {e['venue']}\n"
                f" {e['date']}\n"
                f" {e['source']}"
                for e in events
            )

            return {
                "type": "text",
                "response": response_text
            }

        # -------------------------------------------------
        # TRANSPORT / HEALTH (ML-BASED)
        # -------------------------------------------------
        if intent in ["transport", "health"]:
            rec = hybrid_recommendation(intent, "downtown")
            return {
                "type": "text",
                "response": f" Recommended for you: {rec}"
            }

        # -------------------------------------------------
        # DATA QUERY
        # -------------------------------------------------
        if intent == "data":
            df = load_city_services_data()
            return {
                "type": "text",
                "response": df.head(5).to_string()
            }

        # -------------------------------------------------
        # NORMAL CHAT
        # -------------------------------------------------
        return {
            "type": "text",
            "response": reply or "🤖 How can I help you?"
        }

    except Exception as e:
        print("❌ AGENT ERROR:", e)
        return {
            "type": "text",
            "response": "⚠️ CityAdaptAI is temporarily unavailable."
        }
