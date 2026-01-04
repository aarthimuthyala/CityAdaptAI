import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import axios from "axios";
import { Colors } from "../../constants/theme";
import AnimatedScreen from "../../components/AnimatedScreen";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  type?: "text" | "navigation";
  message: string;
  destination?: string;
  maps_url?: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      type: "text",
      message: "Hello 👋 I’m CityAdaptAI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      message: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMsg.message,
      });

      const data = res.data;

      const aiMsg: ChatMessage = {
        id: Date.now().toString() + "_ai",
        role: "assistant",
        type: data.type || "text",
        message: data.response,
        destination: data.destination,
        maps_url: data.maps_url,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          role: "assistant",
          message: "⚠️ Unable to reach CityAdaptAI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.type === "navigation") {
      return (
        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.text}>{item.message}</Text>

          <TouchableOpacity
            style={styles.mapsBtn}
            onPress={() => Linking.openURL(item.maps_url!)}
          >
            <Text style={styles.mapsText}>Open in Google Maps</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.bubble,
          item.role === "user"
            ? styles.userBubble
            : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            item.role === "user" && { color: "#fff" },
          ]}
        >
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <AnimatedScreen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatArea}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about events, transport, navigation..."
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={styles.sendText}>
              {loading ? "..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AnimatedScreen>
  );
}

/* ✅ STYLES MUST BE OUTSIDE */
const styles = StyleSheet.create({
  chatArea: {
    padding: 16,
  },
  bubble: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: Colors.surface,
    alignSelf: "flex-start",
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 15,
  },
  mapsBtn: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  mapsText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  inputBar: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f2f6",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
