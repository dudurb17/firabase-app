import { User } from "@/src/types/User";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

interface CardProps {
  item: User;
  handleDelete?: (id: string) => void;
  deletingId?: string;
  onPress?: () => void;
}

export default function Card({ item, handleDelete, onPress }: CardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
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
          ]}
          onPress={() => handleDelete?.(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>
            {"🗑️ Excluir"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
