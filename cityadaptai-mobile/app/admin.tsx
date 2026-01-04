import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.metric}>Users</Text>
        <Text style={styles.value}>2</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.metric}>Services</Text>
        <Text style={styles.value}>12</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.metric}>Reviews</Text>
        <Text style={styles.value}>0</Text>
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
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.m,
  },
  metric: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  value: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
});
