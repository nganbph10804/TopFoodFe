import axios from 'axios';
import { authHeader } from '../../authHeader.js';
import { STORE_FAILURE, STORE_REQUEST, TAG_LIST } from '../types/storeType.js';

export const tagListAction = () => async dispatch => {
  dispatch({
    type: STORE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      'http://34.67.241.66:8080/api/tag?enable=false&tagName',
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: TAG_LIST,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: STORE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
