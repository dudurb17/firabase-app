import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="List/index" />
      <Stack.Screen name="UpdateUser/index" options={{ title: "Atualizar Usuário" }} />
    </Stack>
  );
}