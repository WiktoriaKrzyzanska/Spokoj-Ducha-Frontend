import axios from 'axios';
//the xxx should be changed for your IP
const BASE_URL = 'http://xxx.xx.xx.xx:8080';


export const signUp = (firstName, lastName, email, password) => {
  return axios.post(`${BASE_URL}/auth/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};



export const signIn = (email, password) => {
  return axios.post(`${BASE_URL}/auth/signin`, {
    email,
    password,
  });
};