import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  FOLLOW_FAILURE,
  LIST_USER_FOLLOW_STORE,
  FOLLOW_LIST_STORE,
  FOLLOW_REQUEST,
} from './followType.js';

//API danh sách cửa hàng follow của account
export const listStoreFollowAction = () => async dispatch => {
  dispatch({
    type: FOLLOW_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://103.245.251.149:8080/store-profile/list-store-follow?page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOLLOW_LIST_STORE,
      payload: data.data.data,
    });
  } catch (e) {
    dispatch({
      type: FOLLOW_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

//API account follow của cửa hàng
export const userFollowAction = () => async dispatch => {
  dispatch({
    type: FOLLOW_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://103.245.251.149:8080/store-profile/list-follow-store?page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: LIST_USER_FOLLOW_STORE,
      payload: data.data.data,
    });
  } catch (e) {
    dispatch({
      type: FOLLOW_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const followAction = id => async dispatch => {
  dispatch({
    type: FOLLOW_REQUEST,
  });
  try {
    await axios.post(`http://103.245.251.149:8080/store-profile/follow/${id}`, {
      headers: await authHeader(),
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Theo dõi cửa hàng thành công',
    });
  } catch (e) {
    dispatch({
      type: FOLLOW_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const unFollowAction = id => async dispatch => {
  dispatch({
    type: FOLLOW_REQUEST,
  });
  try {
    await axios.delete(
      `http://103.245.251.149:8080/store-profile/un-follow/${id}`,
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Bỏ theo dõi cửa hàng thành công',
    });
  } catch (e) {
    dispatch({
      type: FOLLOW_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
