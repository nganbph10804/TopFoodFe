import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import { CLEAR_FILE } from '../file/types/fileType.js';
import {
  DELETE_FEED,
  FEED_DETAIL,
  FEED_FAILURE,
  FEED_LIST,
  FEED_REQUEST,
} from './feedType.js';

export const storeFeedListAction = id => async dispatch => {
  dispatch({
    type: FEED_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-post?accountId=${id}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FEED_LIST,
      payload: data.data,
    });
    dispatch({
      type: CLEAR_FILE,
    });
  } catch (error) {
    dispatch({
      type: FEED_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const feedDetailAction = id => async dispatch => {
  dispatch({
    type: FEED_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/post/detail/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FEED_DETAIL,
      payload: data.data.data,
    });
    dispatch({
      type: CLEAR_FILE,
    });
  } catch (error) {
    dispatch({
      type: FEED_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const createFeedAction =
  (content, files, foodIds, tagIds, navigation) => async dispatch => {
    dispatch({
      type: FEED_REQUEST,
    });
    try {
      await axios.post(
        `http://58.84.1.32:8080/store-profile/post/create`,
        {
          content: content,
          files: files,
          foodIds: foodIds,
          tagIds: tagIds,
        },
        {
          headers: await authHeader(),
        }
      );
      dispatch({
        type: CLEAR_FILE,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Tạo bài viết thành công',
      });
      if (navigation) navigation.navigate('FeedListScreen');
    } catch (error) {
      dispatch({
        type: FEED_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const updateFeedAction =
  (content, files, foodIds, id, tagIds, navigation) => async dispatch => {
    dispatch({
      type: FEED_REQUEST,
    });
    try {
      await axios.put(
        `http://58.84.1.32:8080/store-profile/post/update`,
        {
          content: content,
          files: files,
          foodIds: foodIds,
          id: id,
          tagIds: tagIds,
        },
        {
          headers: await authHeader(),
        }
      );
      dispatch({
        type: CLEAR_FILE,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Cập nhật bài viết thành công',
      });
      if (navigation) navigation.navigate('FeedListScreen');
    } catch (error) {
      dispatch({
        type: FEED_FAILURE,
      });
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const deleteFeedAction = id => async dispatch => {
  dispatch({
    type: FEED_REQUEST,
  });
  try {
    await axios.delete(
      `http://58.84.1.32:8080/store-profile/post/delete/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: CLEAR_FILE,
    });
    dispatch({
      type: DELETE_FEED,
      payload: id,
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Xoá bài viết thành công',
    });
  } catch (error) {
    dispatch({
      type: FEED_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
