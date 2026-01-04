import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* AVATAR */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>

      {/* USER INFO */}
      <Text style={styles.name}>Aarthi Muthyala</Text>
      <Text style={styles.email}>aarthimuthyala@gmail.com</Text>

      {/* META */}
      <Text style={styles.role}>Smart City Citizen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.l,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 4,
  },
  email: {
    marginTop: 4,
    color: "#E5E7EB",
    fontSize: 14,
  },
  role: {
    marginTop: 10,
    color: "#D1D5DB",
    fontSize: 13,
    fontWeight: "500",
  },
});
