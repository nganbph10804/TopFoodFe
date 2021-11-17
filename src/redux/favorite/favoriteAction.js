import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  FAVORITE_FAILURE,
  FAVORITE_LIST,
  FAVORITE_REQUEST,
} from './favoriteType.js';

export const favoriteListAction = () => async dispatch => {
  dispatch({
    type: FAVORITE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      'http://34.67.241.66:8080/profiles/favorite?page=0&pageSize=1000',
      {
        headers: await authHeader(),
      }
    );
    console.log(data.totalElements);
    dispatch({
      type: FAVORITE_LIST,
      payload: data.totalElements,
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Thành công',
    });
  } catch (error) {
    dispatch({
      type: FAVORITE_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const updateFavoriteAction = tag => async dispatch => {
  dispatch({
    type: FAVORITE_REQUEST,
  });
  try {
    await axios.post(
      'http://34.67.241.66:8080/profiles/favorite/update',
      [tag],
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Cập nhật sở thích thành công',
    });
  } catch (error) {
    dispatch({
      type: FAVORITE_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
