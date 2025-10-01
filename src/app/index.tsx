import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import Loading from "../components/Loading";
import { auth } from "../config/firebase";

export default function Index() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/(tabs)/HomeTab");
      } else {
        router.replace("/(auth)/Login");
      }
    });
  }, [auth]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  );
}
