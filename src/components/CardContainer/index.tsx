import React from "react";
import { Text, View } from "react-native";
import Container from "../Container";
import styles from "./styles";

interface CardContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function CardContainer({
  title,
  subtitle,
  children,
}: CardContainerProps) {
  return (
    <Container colors={["#667eea", "#764ba2"]}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.form}>{children}</View>
      </View>
    </Container>
  );
}
