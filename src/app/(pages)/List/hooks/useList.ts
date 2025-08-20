import { User } from "@/src/types/User";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../../../../config/firebase";

type SortField = "name" | "age" | "createdAt";
type SortOrder = "asc" | "desc";

const useList = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const getSortLabel = (field: SortField) => {
    const labels = {
      name: "Nome",
      age: "Idade",
      createdAt: "Data",
    };
    return labels[field];
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Excluir Usuário",
      "Tem certeza que deseja excluir este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingId(id);
              await deleteDoc(doc(db, "users", id));
            } catch (error) {
              console.log("Erro ao deletar usuário:", error);
              Alert.alert(
                "Erro",
                "Não foi possível excluir o usuário. Tente novamente."
              );
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      onSnapshot(
        query(collection(db, "users"), orderBy(sortField, sortOrder)),
        (snapshot) => {
          const users = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as User[];
          setData(users);
        }
      );
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [sortField, sortOrder]);

  return {
    data,
    loading,
    sortField,
    handleSort,
    getSortIcon,
    getSortLabel,
    handleDelete,
    deletingId,
  };
};

export default useList;
