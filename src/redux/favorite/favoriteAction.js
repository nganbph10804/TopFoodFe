import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  CLEAR_TOTAL,
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
      'http://58.84.1.32:8080/profiles/favorite?page=0&pageSize=1000',
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FAVORITE_LIST,
      payload: data,
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
export const updateFavoriteAction = (tag, navigation) => async dispatch => {
  dispatch({
    type: FAVORITE_REQUEST,
  });
  try {
    await axios.post('http://58.84.1.32:8080/profiles/favorite/update', tag, {
      headers: await authHeader(),
    });
    const { data } = await axios.get(
      'http://58.84.1.32:8080/profiles/favorite?page=0&pageSize=1000',
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FAVORITE_LIST,
      payload: data,
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Cập nhật sở thích thành công',
    });
    if (navigation) navigation.navigate('NAV');
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

export const clearTotalAction = () => dispatch => {
  dispatch({
    type: CLEAR_TOTAL,
  });
};
