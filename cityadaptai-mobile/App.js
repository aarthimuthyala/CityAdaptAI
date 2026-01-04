import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [preference, setPreference] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const getRecommendation = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/recommend",
        {
          name: name,
          location: location,
          preference: preference,
        }
      );
      setRecommendation(response.data.recommendation);
    } catch (e) {
      setRecommendation("Unable to connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityAdaptAI</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Location (Downtown/Uptown)"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Preference (transport / health / event)"
        value={preference}
        onChangeText={setPreference}
      />

      <Button title="Get Recommendation" onPress={getRecommendation} />

      {recommendation !== "" && (
        <Text style={styles.result}>👉 {recommendation}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
});
