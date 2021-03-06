import axios from 'axios';
import mime from 'mime';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../../constants/file.const.js';
import { authHeader } from '../../authHeader.js';
import deviceStorage from '../../deviceStorage .js';
import {
  FILE_DONE,
  FILE_ERR,
  FILE_REQ,
  MULTI_FILE,
  CLEAR_FILE,
  DELETE_FILE,
} from '../types/fileType.js';

export const uploadAvatar = (file, profile, navigation) => async dispatch => {
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
      'http://58.84.1.32:8080/files/uploads',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const url = BASE_URL + data.data.map(i => i.path);
    uploadProfile(
      profile.address,
      url,
      profile.bio,
      profile.birthday,
      profile.cover,
      profile.name,
      navigation
    );
    dispatch({
      type: FILE_DONE,
      payload: url,
    });
  } catch (error) {
    dispatch({
      type: FILE_ERR,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: 'Upload thất bại',
    });
  }
};
export const uploadCover = (file, profile, navigation) => async dispatch => {
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
      'http://58.84.1.32:8080/files/uploads',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const url = BASE_URL + data.data.map(i => i.path);
    uploadProfile(
      profile.address,
      profile.avatar,
      profile.bio,
      profile.birthday,
      url,
      profile.name,
      navigation
    );
    dispatch({
      type: FILE_DONE,
      payload: url,
    });
  } catch (error) {
    dispatch({
      type: FILE_ERR,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: 'Upload thất bại',
    });
  }
};

const uploadProfile = async (
  address,
  avatar,
  bio,
  birthday,
  cover,
  name,
  navigation
) => {
  axios
    .put(
      'http://58.84.1.32:8080/profiles/update',
      {
        address: address,
        avatar: avatar,
        bio: bio,
        birthday: birthday,
        cover: cover,
        name: name,
      },
      {
        headers: await authHeader(),
      }
    )
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Cập nhật thành công',
      });
      if (navigation) {
        navigation.navigate('SettingScreen');
      }
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Cập nhật thất bại',
      });
    });
};

export const multiFileAction = file => async dispatch => {
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
      'http://58.84.1.32:8080/files/uploads',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const url = BASE_URL + data.data.map(i => i.path);
    setTimeout(() => {
      dispatch({
        type: MULTI_FILE,
        payload: url,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FILE_ERR,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: 'Upload thất bại',
    });
  }
};

export const clearFilesAction = () => dispatch => {
  dispatch({
    type: CLEAR_FILE,
  });
};

export const deleteImageAction = item => dispatch => {
  dispatch({
    type: DELETE_FILE,
    payload: item,
  });
};
