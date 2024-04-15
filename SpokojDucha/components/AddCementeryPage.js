import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { addCemetery } from "../microservices/cemetery/Cemetery";

const AddCementeryPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handlAddCementery = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert("Adding Error", "Name and address are required.");
      return;
    }
    addCemetery(name, address)
    .then((response) => {
      Alert.alert(
        "Success",
        `The cemetery with name: ${name} and address: ${address} was added successfully to the database.`,
        [
          { text: "OK", onPress: () => navigation.navigate("Welcome") }
        ]
      );
    })
    .catch((error) => {
      let errorMessage = "Adding failed. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Adding Error", errorMessage, [{ text: "OK" }]);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginTextSection}>
        <TextInput
          placeholder="Name"
          style={styles.inputText}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Address"
          style={styles.inputText}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.loginButtonSection}>
        <Button onPress={handlAddCementery} title="Add" />
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

export default AddCementeryPage;
