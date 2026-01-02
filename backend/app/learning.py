KEYWORDS = {
    "transport": [
        "bus", "metro", "train", "traffic",
        "route", "station", "travel", "navigate"
    ],
    "health": [
        "hospital", "doctor", "clinic",
        "health", "medicine", "ambulance"
    ],
    "events": [
        "event", "concert", "festival",
        "fair", "expo", "show", "music"
    ],
    "parking": [
        "parking", "slot", "vehicle",
        "car", "bike", "garage"
    ],
    "governance": [
        "municipal", "government", "office",
        "certificate", "service", "document"
    ],
}


def extract_topic(message: str) -> str:
    msg = message.lower()

    for topic, words in KEYWORDS.items():
        for w in words:
            if w in msg:
                return topic

    return "general"
