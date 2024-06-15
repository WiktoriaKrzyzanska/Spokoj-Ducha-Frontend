import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
import { signIn } from "../microservices/auth/Auth";
import { FontSizeContext } from '../contexts/FontSizeContext';
const LoginPage = ({ navigation }) => {
  const { fontSizeDelta} = useContext(FontSizeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Login Error", "Email and password are required.");
      return;
    }
    signIn(email, password)
      .then((response) => {
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        Alert.alert("Login Error", errorMessage, [{ text: "OK" }]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
      <Text style={[styles.title, {fontSize: 24 +fontSizeDelta}]}>Logowanie</Text>
      <View style={styles.loginTextSection}>
        <TextInput
          placeholder="Email"
          style={[styles.inputText, {fontSize: 16 +fontSizeDelta}]}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Hasło"
            style={[styles.inputText, {fontSize: 16 +fontSizeDelta}]}
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.showPasswordContainer}>
            <Text style={[styles.showPassword, {fontSize: 16 +fontSizeDelta}]}>{secureTextEntry ? "Pokaż" : "Ukryj"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={[styles.loginButtonText, {fontSize: 16 +fontSizeDelta}]}>Logowanie</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
    
    justifyContent: 'space-between',
    padding: 20,
  },
  formContainer: {
    paddingTop:25,
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
  loginTextSection: {
    width: "100%",
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: "#5DB075",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom:20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
