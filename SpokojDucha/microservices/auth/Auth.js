import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenManagment } from './TokenManagment';
import { BASE_URL } from '../../config/config'

export const signUp = async (firstName, lastName, email, password) => {
  try {
    const response = await tokenManagment.post(`${BASE_URL}/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data; 
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
      const response = await tokenManagment.post(`${BASE_URL}/auth/signin`, {
          email,
          password,
      });
      await AsyncStorage.setItem('token', response.data); 
      return response;
  } catch (error) {
      throw error;
  }
};