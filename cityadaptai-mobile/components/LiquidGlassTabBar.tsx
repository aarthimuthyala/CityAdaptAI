import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function LiquidTabBar({ state, navigation }: any) {
  const { width } = useWindowDimensions();
  const TAB_WIDTH = width / state.routes.length;

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  // ✅ Animate ONLY when tab changes
  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 380,
      easing: Easing.out(Easing.exp),
    });

    // little "liquid squash"
    scale.value = 0.85;
    scale.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.exp),
    });
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scaleX: scale.value },
    ],
  }));

  // 🧭 Route → Icon map
  const iconMap: Record<string, any> = {
    index: "home",
    explore: "compass",
    recommendations: "sparkles",
    events: "calendar",
    saved: "bookmark",
    services: "construct",
    chat: "chatbubbles",
    profile: "person",
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* 🌊 Liquid Indicator */}
        <Animated.View
          style={[
            styles.liquid,
            { width: TAB_WIDTH },
            indicatorStyle,
          ]}
        />

        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const icon = iconMap[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, { width: TAB_WIDTH }]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.85}
            >
              <Ionicons
                name={focused ? icon : `${icon}-outline`}
                size={22}
                color={focused ? "#ffffff" : "#6B7280"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: Platform.OS === "web" ? 12 : 8,
  },
  container: {
    flexDirection: "row",
    height: 64,
    backgroundColor: "#E5E7EB",
    borderRadius: 32,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  liquid: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#4F46E5", // ✅ valid color
    borderRadius: 32,
    zIndex: 1,
  },
});
