import { tokenManagement } from '../auth/TokenManagment'; 
import { BASE_URL } from '../../config/config'; 
export const addDecedent = async (decedentDetails, imageUri) => {
  const formData = new FormData();
  formData.append('decedent', JSON.stringify(decedentDetails));

  if (imageUri) {
      try {
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const reader = new FileReader();

          reader.onloadend = async () => {
              const base64data = reader.result;
              formData.append('tombstoneImage', base64data);
              
              try {
                  const response = await tokenManagement.post(`${BASE_URL}/api/decedent/add`, formData, {
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

          reader.readAsDataURL(blob);
      } catch (error) {
          console.error('Error fetching image:', error.message);
          throw new Error('Failed to fetch image due to an error: ' + error.message);
      }
  } else {
      try {
          const response = await tokenManagement.post(`${BASE_URL}/api/decedent/add`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          return response.data;
      } catch (error) {
          console.error('Error adding decedent:', error.response ? error.response.data : error.message);
          throw new Error('Failed to add decedent due to an error: ' + (error.response ? error.response.data : error.message));
      }
  }
};