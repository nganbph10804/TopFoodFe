import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  FRIEND_LIST,
  GET_PROFILE,
  LIST_REQUEST,
  SEARCH_FRIEND,
} from '../types/friendType.js';

export const searchProfileAction = (phone, page) => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/profiles/search?page=${page}&search=${phone}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: SEARCH_FRIEND,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const getProfileActon = (id, navigation) => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/profiles/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: GET_PROFILE,
      payload: data.data,
    });
    navigation.navigate('PublicProfile');
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const friendListAction = page => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends?page=${page}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FRIEND_LIST,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const listRequestAction = page => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request?page=${page}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: LIST_REQUEST,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const blockFriendAction = phone => async (dispatch) => {
  try {
    await axios.post(
      'http://34.67.241.66:8080/friends/block-friend',
      {
        phoneNumberBlockPerson: phone,
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FRIEND_LIST,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Chặn bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const unfriendAction = phone => async () => {
  try {
    await axios.delete(
      `http://34.67.241.66:8080/friends/remove-friend`,
      {
        friendPhoneNumber: phone,
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Huỷ kết bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const acceptAction = username => async dispatch => {
  try {
    await axios.post(
      `http://34.67.241.66:8080/friends/reply-friend`,
      {
        statusReply: true,
        usernameSendInvitaionPerson: username,
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: LIST_REQUEST,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Chấp nhận kết bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const removeActon = username => async dispatch => {
  try {
    await axios.post(
      `http://34.67.241.66:8080/friends/reply-friend`,
      {
        statusReply: false,
        usernameSendInvitaionPerson: username,
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: LIST_REQUEST,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Xoá thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const sendAction = phone => async () => {
  try {
    await axios.post(
      `http://34.67.241.66:8080/friends/send-friend-invitations`,
      {
        phoneAddressee: phone,
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Gửi lời mời thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
