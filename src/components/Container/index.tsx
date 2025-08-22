import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1}}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}