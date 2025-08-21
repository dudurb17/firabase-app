import Card from "@/src/components/Card";
import Container from "@/src/components/Container";
import Loading from "@/src/components/Loading";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useList from "./hooks/useList";
import styles from "./styles";

export default function List() {
  const {
    data,
    loading,
    sortField,
    handleSort,
    getSortIcon,
    getSortLabel,
    handleDelete,
    deletingId,
  } = useList();

  if (loading) {
    return <Loading text="Carregando usuários..." />;
  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <Text style={styles.subtitle}>
          {data.length} usuário(s) encontrado(s)
        </Text>
      </View>
      {data.length > 0 && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Ordenar por:</Text>
          <View style={styles.filtersRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                sortField === "age" && styles.filterButtonActive,
              ]}
              onPress={() => handleSort("age")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  sortField === "age" && styles.filterButtonTextActive,
                ]}
              >
                {getSortIcon("age")} {getSortLabel("age")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                sortField === "createdAt" && styles.filterButtonActive,
              ]}
              onPress={() => handleSort("createdAt")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  sortField === "createdAt" && styles.filterButtonTextActive,
                ]}
              >
                {getSortIcon("createdAt")} {getSortLabel("createdAt")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyTitle}>Nenhum usuário encontrado</Text>
          <Text style={styles.emptySubtitle}>
            Puxe para baixo para atualizar
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          style={styles.listContainer}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card
              item={item}
              handleDelete={handleDelete}
              onPress={() => router.push({
                pathname: "/UpdateUser",
                params: { id: item.id }
              })}
              key={item.id}
            />
          )}
        />
      )}
    </Container>
  );
}
