import Button from "@/src/components/Button";
import CardContainer from "@/src/components/CardContainer";
import TextInput from "@/src/components/TextInput";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { auth } from "../../../config/firebase";
import styles from "./styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert("Erro no Login", error.message || "Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer title="Login" subtitle="Faça login para continuar">
      <TextInput
        icon="mail-outline"
        Title="Email"
        Placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        icon="lock-closed-outline"
        Title="Senha"
        Placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button text="Entrar" handlePress={handleLogin} loading={loading} />

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => router.push("/Register")}
        activeOpacity={0.7}
      >
        <Text style={styles.createAccountText}>
          Não tem uma conta?{" "}
          <Text style={styles.createAccountLink}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
    </CardContainer>
  );
}
