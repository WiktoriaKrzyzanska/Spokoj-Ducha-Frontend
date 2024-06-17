import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { tokenManagment } from '../microservices/auth/TokenManagment';
import { Video } from 'expo-av';

const UploadVideoPage = ({ route }) => {
  const { id } = route.params;
  const [videoUri, setVideoUri] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

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

  const selectVideo = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    };

    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      console.log('Picker result: ', result);
      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
      } else {
        console.log('User cancelled video picker');
      }
    } catch (error) {
      console.log('VideoPicker Error: ', error);
      Alert.alert('Error', error.message);
    }
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert('No video selected', 'Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    const response = await fetch(videoUri);
    const blob = await response.blob();
    formData.append('file', {
      uri: videoUri,
      name: videoUri.split('/').pop(),
      type: blob.type,
    });
    formData.append('id', id);

    try {
      const result = await tokenManagment.post('/api/decedent/route/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (result.status === 200) {
        Alert.alert('Success', 'Video uploaded successfully');
      } else {
        Alert.alert('Upload failed', 'There was a problem uploading the video');
      }
    } catch (error) {
      Alert.alert('Upload error', 'Error uploading video: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj film</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={selectVideo}>
        <Image source={require('../assets/upload.png')} style={styles.icon} />
        <Text style={styles.imagePickerText}>Wybierz video</Text>
      </TouchableOpacity>
      {videoUri && (
        <View>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setIsPlaying(status.isPlaying)}
          />
          <View style={styles.controlsContainer}>
            <Button
              title={isPlaying ? 'Pause' : 'Play'}
              onPress={() => {
                isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
              }}
            />
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={uploadVideo}>
        <Text style={styles.buttonText}>Wyślij video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    width: '80%',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#aaa',
  },
  video: {
    width: 350,
    height: 275,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  controlsContainer: {
    padding: 10,
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

export default UploadVideoPage;
