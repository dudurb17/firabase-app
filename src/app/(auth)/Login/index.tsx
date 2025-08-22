import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import Container from "../../../components/Container";
import { auth } from "../../../config/firebase";

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
    <Container>
        <View>
            <Text>Login</Text>
        </View>
    </Container>
  );
}