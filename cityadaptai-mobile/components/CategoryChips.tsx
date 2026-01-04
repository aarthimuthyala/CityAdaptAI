import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Spacing, Radius } from "../constants/theme";

const CATEGORIES = ["All", "Transport", "Health", "Events", "Government"];

type CategoryChipsProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryChips({
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.chip,
            selected === cat && styles.active,
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text
            style={[
              styles.text,
              selected === cat && styles.activeText,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.s,
  },
  chip: {
    backgroundColor: Colors.muted,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    borderRadius: Radius.pill,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
