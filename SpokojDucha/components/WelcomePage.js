import React, { useState, useContext, createContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { FontSizeContext } from '../contexts/FontSizeContext';

const WelcomePage = ({ navigation }) => {
  const { fontSizeDelta} = useContext(FontSizeContext);
  return (
    <View style={styles.container}>
   
    <Text style={[styles.welcomeText, {fontSize: 24 +fontSizeDelta}]}>Witaj w aplikacji!</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add cementery')}>
      <Text style={[styles.buttonText, {fontSize: 16 +fontSizeDelta}]}>Dodaj cmentarz</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add decedent')}>
      <Text style={[styles.buttonText, { fontSize: 16 +fontSizeDelta }]}>Dodaj nagrobek</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
      <Text style={[styles.buttonText, { fontSize: 16 +fontSizeDelta }]}>Szukaj</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, {marginTop: 100}]} onPress={() => navigation.navigate('Home')}>
      <Text style={[styles.buttonText, { fontSize: 16 +fontSizeDelta }]}>Wyloguj</Text>
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
 
 
 
  welcomeText: {
   
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
    
    fontWeight: 'bold',
  },
});

export default WelcomePage;
