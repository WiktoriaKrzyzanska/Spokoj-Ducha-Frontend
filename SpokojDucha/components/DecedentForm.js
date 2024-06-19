import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Platform, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { tokenManagment } from '../microservices/auth/TokenManagment';
import { FontSizeContext } from '../contexts/FontSizeContext';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

const DecedentForm = () => {
  const { fontSizeDelta } = useContext(FontSizeContext);
  const [decedent, setDecedent] = useState({
    name: '',
    surname: '',
    birthDate: '',
    deathDate: '',
    description: '',
    cemeteryId: '',
    userId: '',
    city: ''
  });
  const [cemeteries, setCemeteries] = useState([]);
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [showPopupAgain, setShowPopupAgain] = useState(true);
  const pickerRef = useRef();

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
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
          Alert.alert('Permission Required', 'We need camera and media library permissions to make this work!');
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

  const selectImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

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
      const result = await tokenManagment.post('/api/decedent/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Success', 'Decedent added successfully!');
      console.log(result);
    }catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', 'Failed to add decedent: ' + error.response.data);
      } else {
        Alert.alert('Error', 'Failed to add decedent: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Zgodnie z RODO dane osób zmarłych nie podlegają ochronie</Text>
            <View style={styles.modalCheckbox}>
              <Checkbox
                style={styles.checkbox}
                value={!showPopupAgain}
                onValueChange={() => setShowPopupAgain(!showPopupAgain)}
                color={!showPopupAgain ? '#4630EB' : undefined}
              />
              <Text style={styles.checkboxText}>Nie pokazuj ponownie</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TextInput
        placeholder="Imię"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('name', value)}
        value={decedent.name}
      />
      <TextInput
        placeholder="Nazwisko"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('surname', value)}
        value={decedent.surname}
      />
      <TextInput
        placeholder="Data urodzenia (YYYY-MM-DD)"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('birthDate', value)}
        value={decedent.birthDate}
      />
      <TextInput
        placeholder="Data śmierci (YYYY-MM-DD)"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('deathDate', value)}
        value={decedent.deathDate}
      />
      <TextInput
        placeholder="Opis"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('description', value)}
        value={decedent.description}
      />
      <TextInput
        placeholder="Miasto"
        style={[styles.input, { fontSize: 16 + fontSizeDelta }]}
        onChangeText={value => handleInputChange('city', value)}
        value={decedent.city}
      />
      <Text style={[styles.label, { fontSize: 16 + fontSizeDelta }]}>Wybierz cmentarz</Text>
      <View style={styles.pickerContainer}>
        <Picker
          ref={pickerRef}
          selectedValue={decedent.cemeteryId}
          style={styles.picker}
          onValueChange={(value, index) => handleInputChange('cemeteryId', value)}
          mode="dropdown"
          itemStyle={styles.pickerItem}
        >
          {cemeteries.map(cemetery => (
            <Picker.Item key={cemetery.id} label={cemetery.name} value={cemetery.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.imagePicker} onPress={() => selectImage('library')}>
          <Ionicons name="image-outline" size={30} color="grey" />
          <Text style={[styles.imagePickerText, { fontSize: 16 + fontSizeDelta }]}>Prześlij zdjęcie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imagePicker} onPress={() => selectImage('camera')}>
          <Ionicons name="camera-outline" size={30} color="grey" />
          <Text style={[styles.imagePickerText, { fontSize: 16 + fontSizeDelta }]}>Zrób zdjęcie</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { fontSize: 16 + fontSizeDelta }]}>Dodaj</Text>
      </TouchableOpacity>
      {imageUri ? <Text style={[styles.imageText, { fontSize: 16 + fontSizeDelta }]}>Image selected: {imageUri}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
    height: 44,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    width: '48%',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    margin: 8,
  },
  checkboxText: {
    marginLeft: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default DecedentForm;