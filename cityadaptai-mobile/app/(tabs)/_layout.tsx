import { Tabs } from "expo-router";
import LiquidGlassTabBar from "../../components/LiquidGlassTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <LiquidGlassTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="recommendations" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
