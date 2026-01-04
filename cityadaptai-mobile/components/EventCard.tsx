import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Colors, Spacing } from "../constants/theme";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  tags?: string[];
  isFree?: boolean;
  booking_url?: string;
  source?: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.meta}>📅 {event.date}</Text>
      <Text style={styles.meta}>📍 {event.location}</Text>

      {/* TAGS (SAFE) */}
      {event.tags && (
        <View style={styles.tags}>
          {event.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: event.isFree
                ? "#16a34a"
                : Colors.primary,
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {event.isFree ? "FREE EVENT" : "EVENT"}
          </Text>
        </View>

        {event.booking_url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(event.booking_url!)}
          >
            <Text style={styles.link}>
              View on {event.source ?? "Website"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.m,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  meta: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: Colors.textPrimary,
  },
  footer: {
    marginTop: 10,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  link: {
    marginTop: 8,
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
});
