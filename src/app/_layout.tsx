import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(auth)"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
