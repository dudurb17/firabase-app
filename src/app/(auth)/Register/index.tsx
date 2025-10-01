import Button from "@/src/components/Button";
import CardContainer from "@/src/components/CardContainer";
import TextInput from "@/src/components/TextInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../../../config/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta");
    }
  };

  return (
    <CardContainer title="Register" subtitle="Faça registro para continuar">
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

      <Button
        text="Criar conta"
        handlePress={handleRegister}
        loading={loading}
      />
    </CardContainer>
  );
}
