import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader';
import { ALL, FAILURE, REQUEST, SEARCH } from './searchType';

export const allPostAction = () => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-post-all?page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: ALL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const searchPostAction = value => dispatch => {
  dispatch({
    type: SEARCH,
    payload: value,
  });
};
