import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";

interface LoadingProps {
  text?: string;
}

export default function Loading({
  text = "Carregando dados...",
}: LoadingProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
}
