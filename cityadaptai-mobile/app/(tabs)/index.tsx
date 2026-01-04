import { View, Text, StyleSheet, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Home() {
  return (
    <LinearGradient
      colors={Colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      {/* BADGE */}
      <Text style={styles.badge}>
        AI-Powered Smart City Platform
      </Text>

      {/* TITLE */}
      <Text style={styles.title}>
        Your City,{"\n"}Smarter & Simpler
      </Text>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Discover transport, healthcare, events & government services.
      </Text>

      {/* SEARCH */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search services..."
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        <Stat value="50+" label="Cities" />
        <Stat value="10K+" label="Services" />
        <Stat value="1M+" label="Users" />
      </View>
    </LinearGradient>
  );
}



function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statVal}>{value}</Text>
      <Text style={styles.statLbl}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    padding: Spacing.l,
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginVertical: 14,
    lineHeight: 40,
  },
  subtitle: {
    color: "#eaeaea",
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    color: "#111",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  statVal: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  statLbl: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 2,
  },
});

