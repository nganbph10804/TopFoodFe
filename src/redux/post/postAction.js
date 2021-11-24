import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  POST_DETAIL,
  POST_FAILURE,
  POST_LIST,
  POST_REQUEST,
} from './postType.js';

export const postListAction = () => async dispatch => {
  try {
    const { data } = await axios.get(
      'http://103.245.251.149:8080/store-profile/list-post-all?page=0&pageSize=1000',
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: POST_LIST,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const postDetailAction = id => async dispatch => {
  dispatch({
    type: POST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://103.245.251.149:8080/store-profile/post/detail/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: POST_DETAIL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
