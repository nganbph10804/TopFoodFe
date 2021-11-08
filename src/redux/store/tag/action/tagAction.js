import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../../authHeader.js';
import {
  GET_TAG_ID,
  SEARCH_TAG,
  TAG_FAILURE,
  TAG_REQUEST,
} from '../type/tagType.js';

export const searchTagAction = () => async dispatch => {
  dispatch({
    type: TAG_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/api/tag/all?tagName`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: SEARCH_TAG,
        payload: data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: TAG_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const getTagId = (tagId, foodId) => async dispatch => {
  dispatch({
    type: TAG_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/api/tag/${tagId}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      const datas = data.foods;
      dispatch({
        type: GET_TAG_ID,
        payload: {
          datas,
          foodId,
        },
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: TAG_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
