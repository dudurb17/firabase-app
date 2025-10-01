import Container from "@/src/components/Container";
import { auth, db } from "@/src/config/firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

interface UserForm {
  name: string;
  age: string;
  position: string;
}

export default function Form() {
  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    age: "",
    position: "",
  });
  const [userLast, setUserLast] = useState<UserForm>({
    name: "",
    age: "",
    position: "",
  });

  const handleSave = () => {
    if (
      !userForm.name.trim() ||
      !userForm.age.trim() ||
      !userForm.position.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Check if user is authenticated
    if (!auth.currentUser) {
      Alert.alert("Error", "You need to be logged in to save data");
      return;
    }

    addDoc(collection(db, "users"), {
      ...userForm,
      createdAt: new Date(),
      createdBy: auth.currentUser.uid,
    })
      .then(() => {
        handleClear();
        Alert.alert("Success", "User saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        if (error.code === "permission-denied") {
          Alert.alert(
            "Permission Error",
            "You don't have permission to save data. Please check if you're logged in."
          );
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  const fetchLastUser = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("createdAt", "desc"), limit(1));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const lastUser = snapshot.docs[0];
          setUserLast({
            name: lastUser.data().name,
            age: lastUser.data().age,
            position: lastUser.data().position,
          });
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("Erro ao buscar último usuário:", error);
    }
  };

  const handleClear = () => {
    setUserForm({
      name: "",
      age: "",
      position: "",
    });
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupListener = async () => {
      unsubscribe = await fetchLastUser();
    };

    setupListener();

    // Cleanup function para limpar o listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>📝 User Registration</Text>
          <Text style={styles.subtitle}>Add new user information</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
              value={userForm.name}
              onChangeText={(text) => setUserForm({ ...userForm, name: text })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              placeholderTextColor="#9CA3AF"
              value={userForm.age}
              onChangeText={(text) => setUserForm({ ...userForm, age: text })}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Position</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter job position"
              placeholderTextColor="#9CA3AF"
              value={userForm.position}
              onChangeText={(text) =>
                setUserForm({ ...userForm, position: text })
              }
              autoCapitalize="words"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>🗑️ Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>💾 Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={styles.previewContent}>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Name:</Text>{" "}
              {userLast.name || "Não informado"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Age:</Text>{" "}
              {userLast.age || "Não informado"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Position:</Text>{" "}
              {userLast.position || "Não informado"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
