import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../authHeader.js';
import { POST_LIST_BY_CITY } from '../../post/postType.js';
import {
  COMMENT_LIST,
  REACT_FAILURE,
  REACT_REQUEST,
  REPLY_LIST,
} from '../types/reactTypes.js';

export const likePostAction = (id, addressId) => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    await axios.post(
      `http://58.84.1.32:8080/react/reaction-post?id=${id}`,
      {
        type: 'ANGRY',
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-post-address?address=${addressId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: POST_LIST_BY_CITY,
      payload: data.data,
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
export const likeCommentAction = (id, postId) => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    await axios.post(
      `http://58.84.1.32:8080/react/reaction-comment?id=${id}`,
      {
        type: 'ANGRY',
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/react/list-comment-post?id=${postId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: COMMENT_LIST,
      payload: data.data,
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

export const commentListAction = id => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/react/list-comment-post?id=${id}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: COMMENT_LIST,
      payload: data.data,
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
export const commentPostAction = (id, content, files) => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
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
    const { data } = await axios.get(
      `http://58.84.1.32:8080/react/list-comment-post?id=${id}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: COMMENT_LIST,
      payload: data.data,
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
export const removeCommentAction = (id, postId) => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    await axios.delete(
      `http://58.84.1.32:8080/react/comment-post?commentId=${id}`,
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/react/list-comment-post?id=${postId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: COMMENT_LIST,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: REACT_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: 'Bạn không có quyền xoá bình luận',
    });
  }
};
export const replyListAction = commentId => async dispatch => {
  dispatch({
    type: REACT_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/react/list-reply-comment?id=${commentId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: REPLY_LIST,
      payload: data.data,
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
export const replyCommentAction =
  (commentId, content, files) => async dispatch => {
    dispatch({
      type: REACT_REQUEST,
    });
    try {
      await axios.post(
        `http://58.84.1.32:8080/react/comment-reply?id=${commentId}`,
        {
          content: content,
          files: files,
        },
        {
          headers: await authHeader(),
        }
      );
      const { data } = await axios.get(
        `http://58.84.1.32:8080/react/list-reply-comment?id=${commentId}&page=0&pageSize=1000`,
        {
          headers: await authHeader(),
        }
      );
      dispatch({
        type: REPLY_LIST,
        payload: data.data,
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
