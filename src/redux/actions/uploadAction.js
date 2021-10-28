import axios from 'axios';
import Toast from 'react-native-toast-message';
import deviceStorage from '../deviceStorage .js';
import mime from 'mime';
import { FILE_DONE, FILE_ERR, FILE_REQ } from '../fileType.js';

export const uploadAction = file => async dispatch => {
  dispatch({
    type: FILE_REQ,
  });
  try {
    const token = await deviceStorage.loadJWT();
    let formData = new FormData();
    const newImageUri = 'file:///' + file.split('file:/').join('');
    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    const { data } = await axios.post(
      'http://34.67.241.66:8080/files/uploads',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(data.data);
    dispatch({
      type: FILE_DONE,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILE_ERR,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error,
    });
  }
};
