import Icon from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import {
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

export default function TextInput({
  Title,
  Placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
}: {
  Title: string;
  Placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof Icon.glyphMap;
  secureTextEntry?: boolean;
}) {
  const refInput = useRef<RNTextInput>(null);
  const [visible, setVisible] = useState(secureTextEntry);
  return (
    <View>
      {Title && <Text style={styles.label}>{Title}:</Text>}
      <TouchableOpacity
        style={styles.input}
        onPress={() => refInput.current?.focus()}
      >
        {icon && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} size={24} color="#000" />
          </View>
        )}
        <RNTextInput
          ref={refInput}
          style={{ flex: 1, color: "#000" }}
          placeholder={Placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={visible}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setVisible(!visible)}
          >
            <Icon
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}
