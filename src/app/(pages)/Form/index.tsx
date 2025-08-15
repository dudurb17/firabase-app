import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/src/config/firebase";

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

  const handleSave = () => {
    if (!userForm.name.trim() || !userForm.age.trim() || !userForm.position.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    addDoc(collection(db, "users"), userForm).then(() => {
      handleClear();
      Alert.alert("Success", "User saved successfully!");
    }).catch((error) => {
      Alert.alert("Error", error.message);
    });
  };

  const handleClear = () => {
    setUserForm({
      name: "",
      age: "",
      position: "",
    });
  };

  return (
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
              onChangeText={(text) => setUserForm({ ...userForm, position: text })}
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
              <Text style={styles.previewLabel}>Name:</Text> {userForm.name || "Not provided"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Age:</Text> {userForm.age || "Not provided"}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Position:</Text> {userForm.position || "Not provided"}
            </Text>
          </View>
        </View>
      </ScrollView>
  );
}

