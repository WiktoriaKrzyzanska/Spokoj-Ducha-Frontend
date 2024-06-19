import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontSizeContext } from '../contexts/FontSizeContext';
import { tokenManagment } from '../microservices/auth/TokenManagment';

const SearchDecedent = () => {
  const { fontSizeDelta } = useContext(FontSizeContext);
  const [keywords, setKeywords] = useState({
    name: '',
    surname: '',
    city: '',
  });
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setKeywords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    if (keywords.name.length < 2 && keywords.surname.length < 2) {
      Alert.alert('Error', 'Please enter at least 2 characters for either name or surname.');
      return;
    }

    const params = new URLSearchParams();
    if (keywords.name) params.append('name', keywords.name);
    if (keywords.surname) params.append('surname', keywords.surname);
    if (keywords.city) params.append('city', keywords.city);

    try {
      const response = await tokenManagment.get(`/api/decedent/search?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setResults(response.data);
      } else if (response.status === 404) {
        setResults([]);
        Alert.alert('No Results', 'No decedents found.');
      }
    } catch (error) {
      console.error('Error searching decedents:', error);
      if (error.response && error.response.status === 403) {
        Alert.alert('Error', 'You do not have permission to perform this action.');
      } else if (error.response && error.response.status === 404) {
        setResults([]);
        Alert.alert('No Results', 'No decedents found.');
      } else {
        Alert.alert('Error', `Failed to search decedents: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={[styles.input, { fontSize: 16 + fontSizeDelta, paddingVertical: 10 + fontSizeDelta * 0.25 }]} 
        onChangeText={value => handleInputChange('name', value)}
        value={keywords.name}
      />
      <TextInput
        placeholder="Surname"
        style={[styles.input, { fontSize: 16 + fontSizeDelta, paddingVertical: 10 + fontSizeDelta * 0.25 }]}
        onChangeText={value => handleInputChange('surname', value)}
        value={keywords.surname}
      />
      <TextInput
        placeholder="City"
        style={[styles.input, { fontSize: 16 + fontSizeDelta, paddingVertical: 10 + fontSizeDelta * 0.25 }]}
        onChangeText={value => handleInputChange('city', value)}
        value={keywords.city}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Szukaj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: "100%",
  },
  searchButton: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchDecedent;
