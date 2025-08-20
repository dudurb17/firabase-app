import Container from "@/src/components/Container";
import Loading from "@/src/components/Loading";
import { User } from "@/src/types/User";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { db } from "../../../config/firebase";
import styles from "./styles";

export default function List() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as User[];
      setData(users);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Loading text="Carregando usuários..."  />
    );
  }

  return (
    <Container>
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <Text style={styles.subtitle}>{data.length} usuário(s) encontrado(s)</Text>
      </View>

      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyTitle}>Nenhum usuário encontrado</Text>
          <Text style={styles.emptySubtitle}>Puxe para baixo para atualizar</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {data.map((user, index) => (
            <View key={user.id || index} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name || 'Nome não informado'}</Text>
                  <Text style={styles.userAge}>Idade: {user.age || 'Não informada'}</Text>
                </View>
              </View>
              
              {user.position && (
                <View style={styles.cardDetail}>
                  <Text style={styles.detailLabel}>💼 Cargo:</Text>
                  <Text style={styles.detailValue}>{user.position}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
    </Container>
  );
}

