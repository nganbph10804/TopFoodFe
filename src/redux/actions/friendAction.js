import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import {
  BLOCK_LIST,
  CLEAR_SEARCH,
  FRIEND_FAILURE,
  FRIEND_LIST,
  FRIEND_REQUEST,
  GET_PROFILE,
  LIST_REQUEST,
  SEARCH_FRIEND,
} from '../types/friendType.js';
export const searchProfileAction = (phone, page) => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });

  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/profiles/search?page=${page}&search=${phone}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: SEARCH_FRIEND,
        payload: data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const getProfileActon = (id, navigation) => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/profiles/${id}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: GET_PROFILE,
        payload: data.data,
      });
      navigation.navigate('PublicProfile');
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const friendListAction = page => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends?page=${page}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: FRIEND_LIST,
        payload: data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const notificationAction = page => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request?page=${page}&pageSize=2`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: LIST_REQUEST,
        payload: data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const listRequestAction = page => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friends-request?page=${page}&pageSize=10`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: LIST_REQUEST,
        payload: data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const blockFriendAction = phone => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
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
    setTimeout(() => {
      dispatch({
        type: FRIEND_LIST,
        payload: data.data,
      });
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Chặn bạn thành công.',
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const unfriendAction = phone => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    await axios.delete(
      `http://34.67.241.66:8080/friends/remove-friend/${phone}`,
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
    setTimeout(() => {
      dispatch({
        type: FRIEND_LIST,
        payload: data.data,
      });
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Huỷ kết bạn thành công.',
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const acceptAction = username => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
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
    setTimeout(() => {
      dispatch({
        type: LIST_REQUEST,
        payload: data.data,
      });
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Chấp nhận kết bạn thành công.',
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const removeActon = username => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
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
    setTimeout(() => {
      dispatch({
        type: LIST_REQUEST,
        payload: data.data,
      });
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Xoá thành công.',
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const sendAction = phone => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
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
    setTimeout(() => {
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Gửi lời mời thành công.',
      });
      dispatch({
        type: CLEAR_SEARCH,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const unblockAction = (id, page) => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    await axios.post(
      `http://34.67.241.66:8080/friends/unblock-friend`,
      {
        accountIdUnblock: id,
      },
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friend-block?page=${page}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: BLOCK_LIST,
        payload: data.data,
      });
      Toast.show({
        type: 'success',

        text1: 'Thông báo',
        text2: 'Bỏ chặn thành công.',
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const blockListAction = page => async dispatch => {
  dispatch({
    type: FRIEND_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/friends/list-friend-block?page=${page}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: BLOCK_LIST,
        payload: data.data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FRIEND_FAILURE,
    });
    Toast.show({
      type: 'error',

      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
