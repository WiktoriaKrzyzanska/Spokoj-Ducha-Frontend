import { tokenManagment } from '../auth/TokenManagment';
import { BASE_URL } from '../../config/config'

export const addCemetery = async (name, address) => {
  try {
    const response = await tokenManagment.post(`${BASE_URL}/api/cementery`, {
      name,
      address,
    });
    return response.data; 
  } catch (error) {
    console.error('Adding cemetery error:', error.response ? error.response.data : error);
    throw error;
  }
};