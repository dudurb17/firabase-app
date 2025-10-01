import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  buttonDisabled: {
    backgroundColor: "#a0aec0",
    shadowOpacity: 0.2,
  },

  createAccountButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  createAccountLink: {
    color: "#667eea",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
