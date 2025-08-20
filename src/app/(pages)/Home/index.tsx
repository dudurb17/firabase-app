import Container from "@/src/components/Container";
import { User } from "@/src/types/User";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../../config/firebase";
import styles from "./styles";


export default function Index() {
  const [users, setUsers] = useState<User>({ id: "", name: "", age: "" });
  const [loading, setLoading] = useState(false);

  const getUserSnapshot = () => {
    onSnapshot(doc(db, "users", "1"), (snapshot) => {
      if (snapshot.exists()) {
        setUsers(snapshot.data() as User);
      }
    });
  };

  const saveUser = async () => {
    if (!users.name.trim() || !users.age.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, "users", "1"), {
        name: users.name.trim(),
        age: users.age.trim(),
        updatedAt: new Date()
      });
      Alert.alert("Sucesso", "Usuário salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar o usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserSnapshot();
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>👤 Gerenciar Usuário</Text>
          <Text style={styles.subtitle}>Atualize as informações do usuário</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Nome:</Text>
            <Text style={styles.userInfoValue}>{users.name || "Não informado"}</Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Idade:</Text>
            <Text style={styles.userInfoValue}>{users.age || "Não informado"}</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Editar Informações</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              placeholderTextColor="#999"
              value={users.name}
              onChangeText={(text) => setUsers({ ...users, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Idade</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a idade"
              placeholderTextColor="#999"
              value={users.age}
              keyboardType="numeric"
              onChangeText={(text) => setUsers({ ...users, age: text })}
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
            onPress={saveUser}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Salvando..." : "💾 Salvar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

