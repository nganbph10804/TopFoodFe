import axios from 'axios';
import { authHeader } from '../authHeader.js';
import deviceStorage from '../deviceStorage .js';

export const uploadAction = file => async () => {
  try {
    const token = await deviceStorage.loadJWT();
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(
      'http://34.67.241.66:8080/files/uploads',
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
