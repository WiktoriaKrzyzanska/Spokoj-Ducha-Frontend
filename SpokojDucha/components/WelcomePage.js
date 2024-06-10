import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
   
    <Text style={styles.welcomeText}>Witaj w aplikacji!</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add cementery')}>
      <Text style={styles.buttonText}>Dodaj cmentarz</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add decedent')}>
      <Text style={styles.buttonText}>Dodaj nagrobek</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
      <Text style={styles.buttonText}>Szukaj</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, {marginTop: 100}]} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Wyloguj</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
 
  backText: {
    color: '#5DB075',
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
