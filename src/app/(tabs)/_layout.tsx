import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="HomeTab/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="FormTab/index"
        options={{
          title: "Form",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ListTab/index"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
