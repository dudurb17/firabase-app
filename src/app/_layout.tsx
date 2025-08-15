import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./(pages)/Form/styles";

export default function RootLayout() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </KeyboardAvoidingView>
  );
}
