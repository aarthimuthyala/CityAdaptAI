import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Recommendations() {
  return (
    <LinearGradient
      colors={Colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* TITLE */}
      <Text style={styles.title}>Your AI Recommendations</Text>

      {/* TRANSPORT */}
      <View style={styles.card}>
        <Text style={styles.item}>Best Transport Option</Text>
        <Text style={styles.sub}>
          Hyderabad Metro – Line 2
        </Text>
      </View>

      {/* HEALTH */}
      <View style={styles.card}>
        <Text style={styles.item}>Nearby Healthcare</Text>
        <Text style={styles.sub}>
          AIIMS Health Center
        </Text>
      </View>

      {/* EVENT */}
      <View style={styles.card}>
        <Text style={styles.item}>Event Recommendation</Text>
        <Text style={styles.sub}>
          Green City Marathon
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: Spacing.l,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.m,
  },
  item: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  sub: {
    marginTop: 4,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
