import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";

import { services } from "../../data/services";
import SearchBar from "../../components/SearchBar";
import CategoryChips from "../../components/CategoryChips";
import ServiceCard from "../../components/ServiceCard";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 🔍 Filter services
  const filtered = services.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* HERO SECTION */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Explore City Services</Text>
        <Text style={styles.heroSub}>
          Discover services that make urban life easier
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* SEARCH */}
        <SearchBar value={search} onChange={setSearch} />

        {/* CATEGORIES */}
        <View style={{ marginVertical: Spacing.m }}>
          <CategoryChips selected={category} onSelect={setCategory} />
        </View>

        {/* RESULT COUNT */}
        <Text style={styles.result}>
          {filtered.length} services found
        </Text>

        {/* SERVICES LIST */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ServiceCard service={item} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No services found
            </Text>
          }
        />
      </View>
    </View>
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
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  heroSub: {
    marginTop: 6,
    color: "#E0E7FF",
  },
  content: {
    padding: Spacing.m,
    marginTop: -20,
  },
  result: {
    marginBottom: Spacing.s,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textSecondary,
  },
});
