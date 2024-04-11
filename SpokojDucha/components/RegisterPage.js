import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { signUp } from "../microservices/auth/Auth";

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputText}
      />
      <TextInput
        placeholder="Last Name"
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
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.inputText}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default RegisterPage;
