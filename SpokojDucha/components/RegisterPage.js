import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
import { signUp } from "../microservices/auth/Auth";

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      Alert.alert("Registration Error", "Please fill in all fields.");
      return;
    }
    signUp(firstName, lastName, email, password)
      .then((response) => {
        console.log("Signup Success", response.data);
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        let errorMessage = "Registration failed. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage = "The request was made but no response was received";
        } else {
          errorMessage = error.message;
        }

        Alert.alert("Registration Error", errorMessage, [{ text: "OK" }]);
      });
  };

  return (
    <View style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.title}>Rejestracja</Text>
      <TextInput
        placeholder="Imię"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputText}
      />
      <TextInput
        placeholder="Nazwisko"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputText}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputText}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          style={styles.inputText}
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.showPasswordContainer}>
          <Text style={styles.showPassword}>{secureTextEntry ? "Pokaż" : "Ukryj"}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
      <Text style={styles.registerButtonText}>Zarejestruj się</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  formContainer: {
    paddingTop: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  showPasswordContainer: {
    position: "absolute",
    right: 10,
    paddingRight: 10,
  },
  showPassword: {
    color: "#5DB075",
  },
  registerButton: {
    backgroundColor: "#5DB075",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});

export default RegisterPage;
