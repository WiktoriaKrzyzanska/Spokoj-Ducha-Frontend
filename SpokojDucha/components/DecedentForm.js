import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDecedent } from '../microservices/decedent/Decedent'; 

const DecedentForm = () => {
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
  const [imageUri, setImageUri] = useState('');
  const [datePicker, setDatePicker] = useState({ birth: false, death: false });

  useEffect(() => {
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

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || decedent[field];
    setDatePicker({ ...datePicker, [field]: false });
    handleInputChange(field, currentDate.toISOString().split('T')[0]); 
  };

  const showDatePicker = (field) => {
    setDatePicker({ ...datePicker, [field]: true });
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await addDecedent(decedent, imageUri);
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
        placeholder="Name"
        style={styles.input}
        onChangeText={value => handleInputChange('name', value)}
        value={decedent.name}
      />
      <TextInput
        placeholder="Surname"
        style={styles.input}
        onChangeText={value => handleInputChange('surname', value)}
        value={decedent.surname}
      />
      <Button title="Select Birth Date" onPress={() => showDatePicker('birth')} />
      {datePicker.birth && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'birthDate')}
        />
      )}
      <Button title="Select Death Date" onPress={() => showDatePicker('death')} />
      {datePicker.death && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'deathDate')}
        />
      )}
      <TextInput
        placeholder="Description"
        style={styles.input}
        onChangeText={value => handleInputChange('description', value)}
        value={decedent.description}
      />
      <TextInput
        placeholder="Latitude"
        style={styles.input}
        onChangeText={value => handleInputChange('latitude', value)}
        value={decedent.latitude}
      />
      <TextInput
        placeholder="Longitude"
        style={styles.input}
        onChangeText={value => handleInputChange('longitude', value)}
        value={decedent.longitude}
      />
      <TextInput
        placeholder="Cemetery ID"
        style={styles.input}
        onChangeText={value => handleInputChange('cemeteryId', value)}
        value={decedent.cemeteryId}
      />
      <TextInput
        placeholder="User ID"
        style={styles.input}
        onChangeText={value => handleInputChange('userId', value)}
        value={decedent.userId}
      />
      <Button title="Select Image" onPress={selectImage} />
      <Button title="Submit" onPress={handleSubmit} />
      {imageUri ? <Text>Image selected: {imageUri}</Text> : null}
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
  },
});

export default DecedentForm;
