import React from "react";
import { StyleSheet, Text, View, Button , TouchableOpacity, ImageBackground} from "react-native";

const MainPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/bgimage.png')} 
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Spokój Ducha</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.buttonText}>Logowanie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Zarejestruj się</Text>
          </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 50,
    
  },

  title: {
    fontSize: 32,
    color: '#5DB075',
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',

    width: '100%',
    paddingHorizontal: 20,
   
   
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainPage;
