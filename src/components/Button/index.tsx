import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Button({
  loading,
  handlePress,
  text,
}: {
  loading?: boolean;
  handlePress: () => void;
  text: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading && <ActivityIndicator size="small" color="#ffffff" />}
      <Text style={styles.TextStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
