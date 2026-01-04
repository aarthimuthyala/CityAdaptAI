import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Saved() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Items</Text>
      <Text style={styles.empty}>
        You haven’t saved any services or events yet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.l,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.s,
    color: Colors.textPrimary,
  },
  empty: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
  },
});
