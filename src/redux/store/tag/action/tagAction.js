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
      `http://58.84.1.32:8080/api/tag/all?tagName`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: SEARCH_TAG,
      payload: data,
    });
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
export const findTagIdByStoreAction = tagId => async dispatch => {
  dispatch({
    type: TAG_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/api/tag/store/${tagId}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: GET_TAG_ID,
      payload: data,
    });
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
