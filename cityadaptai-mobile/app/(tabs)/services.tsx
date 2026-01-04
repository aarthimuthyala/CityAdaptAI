import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Services() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Services</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Transport Services</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Health Facilities</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>City Events</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.l,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.m,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.m,
    borderRadius: 14,
    marginBottom: Spacing.m,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
