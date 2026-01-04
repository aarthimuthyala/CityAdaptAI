import { recommendEvents } from "./eventRecommender";

export function chatAgent(message: string) {
  const text = message.toLowerCase();

  if (
    text.includes("event") ||
    text.includes("show") ||
    text.includes("concert") ||
    text.includes("meetup")
  ) {
    const results = recommendEvents(text);

    if (results.length === 0) {
      return "😕 No upcoming events found in your city.";
    }

    return (
      "🎉 Here are some events you might like:\n\n" +
      results
        .map(
          (e) =>
            `🎟️ ${e.title}
📍 ${e.venue}
📅 ${e.date} | ${e.time}
🔗 ${e.source}`
        )
        .join("\n\n")
    );
  }

  return "I can help you find events, transport, healthcare, and city services.";
}
