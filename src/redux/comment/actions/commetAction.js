import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../authHeader.js';
import { COMMENT_FAILURE, COMMENT_REQUEST } from '../types/commentType.js';

export const commentAction = (id, content, files) => async dispatch => {
  dispatch({
    type: COMMENT_REQUEST,
  });
  try {
    await axios.post(
      `http://58.84.1.32:8080/react/comment-post?id=${id}`,
      {
        content: content,
        files: files,
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
      type: COMMENT_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const deleteCommentAction = commentId => async dispatch => {
  dispatch({
    type: COMMENT_REQUEST,
  });
  try {
    await axios.delete(
      `http://58.84.1.32:8080/react/comment-post?commentId=${commentId}`,
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
      type: COMMENT_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
