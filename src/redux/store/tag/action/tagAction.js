import axios from 'axios';
import { authHeader } from '../../../authHeader.js';
import { TAG_FAILURE, TAG_LIST, TAG_REQUEST } from '../type/tagType.js';

export const tagListAction = () => async dispatch => {
  dispatch({
    type: TAG_REQUEST,
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
