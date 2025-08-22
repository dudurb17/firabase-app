import { Stack } from "expo-router";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { auth } from "../config/firebase";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
    });
  }, [auth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </SafeAreaView>
  );
}
