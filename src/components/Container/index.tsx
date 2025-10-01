import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ColorValue, KeyboardAvoidingView, Platform } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

export default function Container({ children, colors }: ContainerProps) {
  return (
    <LinearGradient
      colors={colors || ["#ffffff", "#f8f9fa"]}
      style={{ flex: 1, padding: 20 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
