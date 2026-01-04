import { events } from "../data/events";

export function recommendEvents(query: string, city = "hyderabad") {
  const q = query.toLowerCase();

  return events.filter((e) => {
    const isUpcoming = new Date(e.date) >= new Date();
    const matchesCity = e.city === city;
    const matchesCategory =
      q.includes(e.category) ||
      e.tags.some((t) => q.includes(t.toLowerCase())) ||
      q.includes("event");

    return isUpcoming && matchesCity && matchesCategory;
  });
}
