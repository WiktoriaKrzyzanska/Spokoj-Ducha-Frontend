import React, { useState, useContext, createContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontSizeContext } from '../contexts/FontSizeContext';

const SettingsPage = ({ navigation }) => {
  const { fontSizeDelta, increaseFontSize, decreaseFontSize } = useContext(FontSizeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {fontSize: 24 + fontSizeDelta}]}>Modyfikuj czcionkę</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
          <Text style={[styles.buttonText, {fontSize: 17 + fontSizeDelta}]}>A↑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
          <Text style={[styles.buttonText, {fontSize: 14 + fontSizeDelta}]}>A↓</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Authors')}>
        <Text style={[styles.buttonText, {fontSize: 16 + fontSizeDelta}]}>O autorach</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsPage;