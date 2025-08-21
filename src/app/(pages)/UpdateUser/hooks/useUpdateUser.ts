import { User } from "@/src/types/User";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../../../../config/firebase";


interface UseUpdateUserProps {
  formData: User;
  setFormData: (item: User) => void;
  id: string;
}

export default function useUpdateUser({ formData, setFormData, id }: UseUpdateUserProps) {

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", id as string);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as User;
        setFormData({
          id: userData.id,
          name: userData.name || '',
          age: userData.age || '',
          position: userData.position || ''
        });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    if (!formData.name.trim() || !formData.age.trim()) {
      Alert.alert('Validação', 'Nome e idade são obrigatórios');
      return;
    }

    try {
      setUpdating(true);
      const userRef = doc(db, "users", id as string);
      await updateDoc(userRef, {
        name: formData.name.trim(),
        age: formData.age.trim(),
        position: formData.position?.trim() || null,
        updatedAt: new Date()
      });
      
      Alert.alert(
        'Sucesso!', 
        'Usuário atualizado com sucesso',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Edição',
      'Tem certeza que deseja cancelar? As alterações serão perdidas.',
      [
        { text: 'Continuar Editando', style: 'cancel' },
        { text: 'Cancelar', style: 'destructive', onPress: () => router.back() }
      ]
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    loading,
    updating,
    updateUser,
    handleCancel,
  };
};