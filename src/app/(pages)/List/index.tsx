import Container from "@/src/components/Container";
import Loading from "@/src/components/Loading";
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
            <View>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {item.name || "Nome não informado"}
                    </Text>
                    <Text style={styles.userAge}>
                      Idade: {item.age || "Não informada"}
                    </Text>
                  </View>
                </View>
                {item.position && (
                  <View style={styles.cardDetail}>
                    <Text style={styles.detailLabel}>💼 Cargo:</Text>
                    <Text style={styles.detailValue}>{item.position}</Text>
                  </View>
                )}
                {item.createdAt && (
                  <View style={styles.cardDetail}>
                    <Text style={styles.detailLabel}>📅 Criado em:</Text>
                    <Text style={styles.detailValue}>
                      {item.createdAt.toDate().toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    deletingId === item.id && styles.deleteButtonLoading,
                  ]}
                  onPress={() => handleDelete(item.id)}
                  activeOpacity={0.7}
                  disabled={deletingId === item.id}
                >
                  <Text
                    style={[
                      styles.deleteButtonText,
                      deletingId === item.id && styles.deleteButtonTextLoading,
                    ]}
                  >
                    {deletingId === item.id ? "⏳ Excluindo..." : "🗑️ Excluir"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </Container>
  );
}
