import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";

import { events } from "../../data/events";
import SearchBar from "../../components/SearchBar";
import CategoryChips from "../../components/CategoryChips";
import EventCard from "../../components/EventCard";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 🔍 Filter by category + search
  const filtered = events.filter(
    (e) =>
      (category === "All" ||
        e.category.toLowerCase() === category.toLowerCase()) &&
      e.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📅 Split upcoming & past
  const upcoming = filtered.filter(
    (e) => new Date(e.date) >= new Date()
  );

  const past = filtered.filter(
    (e) => new Date(e.date) < new Date()
  );

  return (
    <AnimatedScreen>
      <View style={styles.container}>
        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>City Events</Text>
          <Text style={styles.heroSub}>
            Discover events happening near you
          </Text>
        </View>

        {/* SCROLLABLE CONTENT */}
        <FlatList
          data={upcoming}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard event={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              {/* SEARCH */}
              <SearchBar value={search} onChange={setSearch} />

              {/* CATEGORIES */}
              <View style={{ marginVertical: Spacing.m }}>
                <CategoryChips
                  selected={category}
                  onSelect={setCategory}
                />
              </View>

              {/* UPCOMING TITLE */}
              <Text style={styles.section}>
                Upcoming Events ({upcoming.length})
              </Text>

              {upcoming.length === 0 && (
                <Text style={styles.empty}>
                  No upcoming events found
                </Text>
              )}

              {/* PAST EVENTS */}
              {past.length > 0 && (
                <>
                  <Text style={styles.section}>
                    Past Events ({past.length})
                  </Text>

                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </>
              )}
            </>
          }
        />
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    backgroundColor: Colors.primary,
    padding: Spacing.l,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  heroSub: {
    marginTop: 6,
    color: "#E0E7FF",
  },
  content: {
    padding: Spacing.m,
    paddingBottom: 40,
    marginTop: -20,
  },
  section: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: Spacing.s,
    color: Colors.textPrimary,
  },
  empty: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginVertical: 16,
  },
});
