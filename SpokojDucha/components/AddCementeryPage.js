import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import axios from 'axios';
import { addCemetery } from "../microservices/cemetery/Cemetery";
import { GOOGLE_PLACES_API_KEY } from '../config/config';
import { FontSizeContext } from '../contexts/FontSizeContext';

const AddCemeteryPage = ({ navigation }) => {
  const { fontSizeDelta } = useContext(FontSizeContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Wymagane uprawnienia', 'Uprawnienia lokalizacji są wymagane do pobrania najbliższego cmentarza');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchNearestCemetery(location.coords.latitude, location.coords.longitude);
    };

    const fetchNearestCemetery = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
          params: {
            location: `${latitude},${longitude}`,
            radius: 2000,
            type: 'cemetery',
            key: `${GOOGLE_PLACES_API_KEY}`
          }
        });

        const cemeteryData = response.data.results[0];
        if (cemeteryData) {
          setName(cemeteryData.name);
          setAddress(cemeteryData.vicinity);
        } else {
          Alert.alert('Błąd pobierania', 'Pobieranie najbliższego cmentarza nie powiodło się.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Błąd pobierania', 'Pobieranie najbliższego cmentarza nie powiodło się.');
      } finally {
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  const handleAddCemetery = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert("Błąd dodawania", "Nazwa i adres są wymagane");
      return;
    }
    addCemetery(name, address)
      .then((response) => {
        Alert.alert(
          "Sukces",
          `Cmentarz o nazwie: ${name} i adresie: ${address} został dodany do bazy danych.`,
          [
            { text: "OK", onPress: () => navigation.navigate("Welcome") }
          ]
        );
      })
      .catch((error) => {
        let errorMessage = "Dodawanie nie powiodło się. Spróbuj ponownie.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Alert.alert("Błąd dodawania", errorMessage, [{ text: "OK" }]);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Nazwa"
          style={[styles.input, { fontSize: 16 + fontSizeDelta, minHeight: 40 + fontSizeDelta }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Adres"
          style={[styles.input, { fontSize: 16 + fontSizeDelta, minHeight: 40 + fontSizeDelta }]}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddCemetery}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Dodaj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCemeteryPage;