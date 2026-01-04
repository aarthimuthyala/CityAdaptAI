import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors, Spacing, Radius } from "../constants/theme";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search..."
        placeholderTextColor={Colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    marginBottom: Spacing.m,
  },
  input: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
