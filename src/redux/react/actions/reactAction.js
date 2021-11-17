import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../authHeader.js';
import { REACT_FAILURE, REACT_REQUEST } from '../types/reactTypes.js';

export const reactPostAction = id => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    await axios.post(
      `http://34.67.241.66:8080/react/reaction-post?id=${id}`,
      {
        type: 'ANGRY',
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Thành công',
    });
  } catch (error) {
    dispatch({
      type: REACT_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const reactCommentAction = id => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    await axios.post(
      `http://34.67.241.66:8080/react/reaction-comment?id=${id}`,
      {
        type: 'ANGRY',
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Thành công',
    });
  } catch (error) {
    dispatch({
      type: REACT_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
