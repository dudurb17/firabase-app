import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        {children}
    </KeyboardAvoidingView>
  );
}