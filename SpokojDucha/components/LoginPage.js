import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { signIn } from "../microservices/auth/Auth";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <View style={styles.loginTextSection}>
        <TextInput
          placeholder="Email"
          style={styles.inputText}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputText}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.loginButtonSection}>
        <Button onPress={handleLogin} title="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTextSection: {
    marginBottom: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  loginButtonSection: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "blue",
    color: "white",
  },
});

export default LoginPage;
