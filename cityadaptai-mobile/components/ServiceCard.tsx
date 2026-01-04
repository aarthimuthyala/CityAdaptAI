import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, Radius } from "../constants/theme";

type Service = {
  id: number;
  name: string;
  category: string;
  description?: string;
};

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.category}>{service.category}</Text>
      {service.description && (
        <Text style={styles.desc}>{service.description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.m,
    marginBottom: Spacing.m,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  category: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.primary,
  },
  desc: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
