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
        Alert.alert('Permission Denied', 'Location permission is required to fetch the nearest cemetery.');
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
          Alert.alert('Fetch Error', 'Unable to fetch nearest cemetery.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Fetch Error', 'An error occurred while fetching the nearest cemetery.');
      } finally {
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  const handleAddCemetery = () => {
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Name"
          style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Address"
          style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddCemetery}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Add</Text>
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