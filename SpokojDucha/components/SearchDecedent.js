import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image } from 'react-native';
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

  const handleNavigate = (id) => {
    if (isNaN(id)) {
      Alert.alert('Invalid ID', 'The decedent ID is not valid.');
      return;
    }
    navigation.navigate('NavigatePage', { id });
  };

  const handleUploadVideo = (id) => {
    if (isNaN(id)) {
      Alert.alert('Invalid ID', 'The decedent ID is not valid.');
      return;
    }
    navigation.navigate('UploadVideo', { id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      {item.imageBase64 && (
        <Image
          source={{ uri: `data:image/png;base64,${item.imageBase64}` }}
          style={styles.image}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.boldText, { fontSize: 16 + fontSizeDelta }]}>{item.name} {item.surname}</Text>
        <Text style={[styles.resultText, { fontSize: 16 + fontSizeDelta }]}>Data urodzenia: {item.birthDate}</Text>
        <Text style={[styles.resultText, { fontSize: 16 + fontSizeDelta }]}>Data śmierci: {item.deathDate}</Text>
        <Text style={[styles.resultText, { fontSize: 16 + fontSizeDelta }]}>Opis: {item.description}</Text>
        <Text style={[styles.resultText, { fontSize: 16 + fontSizeDelta }]}>Miasto: {item.city}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item.id)}>
            <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Nawiguj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleUploadVideo(item.id)}>
            <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Dodaj film</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('name', value)}
        value={keywords.name}
      />
      <TextInput
        placeholder="Surname"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('surname', value)}
        value={keywords.surname}
      />
      <TextInput
        placeholder="City"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('city', value)}
        value={keywords.city}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Szukaj</Text>
      </TouchableOpacity>
      {results.length > 0 && (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#5DB075',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchDecedent;