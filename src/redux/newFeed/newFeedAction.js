import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader';
import { FAILURE, FOLLOW, LIKE, REQUEST } from './newFeedType';

export const maxLikeAction = () => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-post-like?page=0&pageSize=5`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: LIKE,
      payload: data,
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
export const followerAction = () => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-post-follow?page=0&pageSize=5`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOLLOW,
      payload: data,
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
