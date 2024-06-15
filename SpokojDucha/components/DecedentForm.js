import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { tokenManagment } from '../microservices/auth/TokenManagment';
import { BASE_URL } from '../config/config';
import { FontSizeContext } from '../contexts/FontSizeContext';


const DecedentForm = () => {
  const { fontSizeDelta} = useContext(FontSizeContext);
  const [decedent, setDecedent] = useState({
    name: '',
    surname: '',
    birthDate: '',
    deathDate: '',
    description: '',
    latitude: '',
    longitude: '',
    cemeteryId: '',
    userId: ''
  });
  const [cemeteries, setCemeteries] = useState([]);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const fetchCemeteries = async () => {
      try {
        const response = await tokenManagment.get('/api/cemetery');
        setCemeteries(response.data);
      } catch (error) {
        console.error('Error fetching cemeteries:', error);
        Alert.alert('Error', 'Failed to fetch cemeteries.');
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await tokenManagment.get('/user/id');
        setDecedent(prevState => ({
          ...prevState,
          userId: response.data
        }));
      } catch (error) {
        console.error('Error fetching user ID:', error);
        Alert.alert('Error', 'Failed to fetch user ID.');
      }
    };

    fetchCemeteries();
    fetchUserId();

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'We need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleInputChange = (name, value) => {
    setDecedent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image URI:', result.assets[0].uri);  
      setImageUri(result.assets[0].uri);
    } else {
      console.log('Image selection cancelled');
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('decedent', JSON.stringify(decedent));
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      formData.append('tombstoneImage', {
        uri: imageUri,
        name: 'tombstone.jpg', 
        type: blob.type
      });
      console.log('Image Blob:', blob); 
    } else {
      console.log('No image selected');
    }

    try {
      const result = await tokenManagment.post(`${BASE_URL}/api/decedent/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Success', 'Decedent added successfully!');
      console.log(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to add decedent: ' + error.message);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Imię"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('name', value)}
        value={decedent.name}
      />
      <TextInput
        placeholder="Nazwisko"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('surname', value)}
        value={decedent.surname}
      />
      <TextInput
        placeholder="Data urodzenia (YYYY-MM-DD)"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('birthDate', value)}
        value={decedent.birthDate}
      />
      <TextInput
        placeholder="Data śmierci (YYYY-MM-DD)"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('deathDate', value)}
        value={decedent.deathDate}
      />
      <TextInput
        placeholder="Opis"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('description', value)}
        value={decedent.description}
      />
      <TextInput
        placeholder="Szerokość geograficzna"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('latitude', value)}
        value={decedent.latitude}
      />
      <TextInput
        placeholder="Długość geograficzna"
        style={[styles.input, {fontSize: 16 + fontSizeDelta}]}
        onChangeText={value => handleInputChange('longitude', value)}
        value={decedent.longitude}
      />
      <Text style={[styles.label, {fontSize: 16 + fontSizeDelta}]}>Wybierz cmentarz</Text>
      <Picker
        selectedValue={decedent.cemeteryId}
        style={[styles.picker, {fontSize: 16 + fontSizeDelta}]}
        onValueChange={value => handleInputChange('cemeteryId', value)}
      >
        {cemeteries.map(cemetery => (
          <Picker.Item key={cemetery.id} label={cemetery.name} value={cemetery.id} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        <Image source={require('../assets/upload.png')} style={styles.icon} />
        <Text style={[styles.imagePickerText, { fontSize: 16 + fontSizeDelta }]}>Prześlij zdjęcie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Dodaj</Text>
      </TouchableOpacity>
      {imageUri ? <Text style={[styles.imageText, {fontSize: 16 + fontSizeDelta}]}>Image selected: {imageUri}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#aaa',
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
  picker: {
    height: 50,
    marginBottom: 12,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  imageText: {
    marginTop: 10,
    color: 'grey',
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
});

export default DecedentForm;