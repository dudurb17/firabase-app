import Container from "@/src/components/Container";
import Loading from "@/src/components/Loading";
import { User } from "@/src/types/User";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useUpdateUser from "./hooks/useUpdateUser";
import styles from "./styles";
 
export default function UpdateUser() {
  const { id } = useLocalSearchParams<{id: string}>();
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    age: "",
    position: "",
  });
  const { loading, updating, updateUser, handleCancel } = useUpdateUser({
    formData,
    setFormData,
    id,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            ✏️ Atualize as informações do usuário
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Informações Pessoais</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo"
              placeholderTextColor="#9CA3AF"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Idade *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a idade"
              placeholderTextColor="#9CA3AF"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cargo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o cargo (opcional)"
              placeholderTextColor="#9CA3AF"
              value={formData.position}
              onChangeText={(text) =>
                setFormData({ ...formData, position: text })
              }
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Prévia das Alterações</Text>
          <View style={styles.previewContent}>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Nome:</Text>{" "}
              {formData.name || "Não informado"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Idade:</Text>{" "}
              {formData.age || "Não informada"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Cargo:</Text>{" "}
              {formData.position || "Não informado"}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={updating}
          >
            <Text style={styles.cancelButtonText}>❌ Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.updateButton,
              updating && styles.updateButtonLoading,
            ]}
            onPress={updateUser}
            disabled={updating}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.updateButtonText,
                updating && styles.updateButtonTextLoading,
              ]}
            >
              {updating ? "⏳ Atualizando..." : "💾 Salvar Alterações"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
