import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Page</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Profile")} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    marginTop: 10,
  },
});

export default MainPage;
