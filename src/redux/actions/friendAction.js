import {
  BLOCK_FRIEND,
  FRIEND_LIST,
  GET_PROFILE,
  INVITATION,
  LIST_REQUEST,
  REPLY,
  SEARCH_FRIEND,
  UNFRIEND,
} from '../types/friendType.js';
import { axios } from 'axios';

export const searchProfileAction =
  (phone, page, navigation) => async dispatch => {
    try {
      const { data } = await axios.get(
        //   `http://34.67.241.66:8080/profiles/search?search=${phone}`
        `http://34.67.241.66:8080/profiles/search?page=${page}&search=${phone}`
      );
      dispatch({
        type: SEARCH_FRIEND,
        payload: data.data,
      });
      navigation.navigate('SearchFriend');
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const getProfileActon = (id, navigation) => async dispatch => {
  try {
    const { data } = await axios.get(`http://34.67.241.66:8080/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: data.data,
    });
    navigation.navigate('PublicProfile');
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const friendListAction = page => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends?page=${page}&pageSize=10`
    );
    dispatch({
      type: FRIEND_LIST,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const listRequestAction = page => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request?page=${page}`
    );
    dispatch({
      type: LIST_REQUEST,
      payload: data.data,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const blockFriendAction = phone => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://34.67.241.66:8080/friends/block-friend`,
      {
        phoneNumberBlockPerson: phone,
      }
    );
    dispatch({
      type: BLOCK_FRIEND,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Chặn bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const unfriendAction = phone => async dispatch => {
  try {
    const { data } = await axios.delete(
      `http://34.67.241.66:8080/friends/remove-friend`,
      {
        friendPhoneNumber: phone,
      }
    );
    dispatch({
      type: UNFRIEND,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Huỷ kết bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const replyAction = (username, status) => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://34.67.241.66:8080/friends/reply-friend`,
      {
        statusReply: status,
        usernameSendInvitaionPerson: username,
      }
    );
    dispatch({
      type: REPLY,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Chấp nhận kết bạn thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const invitationAction = phone => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://34.67.241.66:8080/friends/reply-friend`,
      {
        phoneAddressee: phone,
      }
    );
    dispatch({
      type: INVITATION,
      payload: data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Gửi lời mời thành công.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
