import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/config';

export const tokenManagment = axios.create({
  baseURL: `${BASE_URL}`,
});

tokenManagment.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const addDecedent = async (decedentDetails, imageUri) => {
  const formData = new FormData();
  formData.append('decedent', JSON.stringify(decedentDetails));

  if (imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    formData.append('tombstoneImage', {
      uri: imageUri,
      type: blob.type,
      name: imageUri.split('/').pop(),
    });
  }

  try {
    const response = await tokenManagment.post('/api/decedent/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding decedent:', error.response ? error.response.data : error.message);
    throw new Error('Failed to add decedent due to an error: ' + (error.response ? error.response.data : error.message));
  }
};
