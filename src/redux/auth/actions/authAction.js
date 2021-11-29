import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../authHeader.js';
import deviceStorage from '../../deviceStorage .js';
import {
  AUTH_DONE,
  EDIT_PROFILE,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_REQUEST,
} from '../types/authType';

export const loginAction = (username, password) => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const { data } = await axios.post(
      'http://103.245.251.149:8080/auth/login-with-username',
      {
        username: username,
        password: password,
      }
    );
    setTimeout(() => {
      const token = data.data.token;
      deviceStorage.saveJWT(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Đăng nhập thành công.',
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const registerAction =
  (birthday, email, name, password, phone, username, navigation) =>
  async dispatch => {
    dispatch({
      type: AUTH_REQUEST,
    });
    try {
      await axios.post('http://103.245.251.149:8080/auth/register', {
        birthday: birthday,
        email: email,
        name: name,
        password: password,
        phoneNumber: phone,
        username: username,
      });
      setTimeout(() => {
        dispatch({
          type: AUTH_DONE,
        });
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Đăng ký tài khoản thành công.',
        });
        navigation.navigate('LOGIN');
      }, 1000);
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };

export const activeAction = email => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    await axios.get(`http://103.245.251.149:8080/auth/get-otp?email=${email}`);
    dispatch({
      type: AUTH_DONE,
    });
    Toast.show({
      type: 'success',
      text1: 'Thông báo',
      text2: 'Gửi mã xác nhận thành công.',
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const getOtpAction = (email, navigation) => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    await axios.get(`http://103.245.251.149:8080/auth/get-otp?email=${email}`);
    setTimeout(() => {
      dispatch({
        type: AUTH_DONE,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Gửi mã xác nhận thành công.',
      });
      navigation.navigate('FORGOT_PASSWORD', { email });
    }, 1500);
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const forgotAction =
  (email, newPassword, otp, navigation) => async dispatch => {
    dispatch({
      type: AUTH_REQUEST,
    });
    try {
      await axios.post('http://103.245.251.149:8080/auth/forgot-password', {
        email: email,
        newPassword: newPassword,
        otp: otp,
      });
      setTimeout(() => {
        dispatch({
          type: AUTH_DONE,
        });
        Toast.show({
          type: 'success',

          text1: 'Thông báo',
          text2: 'Thành công.',
        });
        navigation.navigate('LOGIN');
      }, 1500);
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
      });
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const logoutAction = () => dispatch => {
  Toast.show({
    type: 'success',
    text1: 'Thông báo',
    text2: 'Đăng xuất thành công. Mời đăng nhập lại!!',
  });
  dispatch({
    type: LOGOUT,
  });
  deviceStorage.deleteJWT();
};

export const updateProfileAction =
  (address, avatar, bio, birthday, cover, name, navigation) =>
  async dispatch => {
    dispatch({
      type: AUTH_REQUEST,
    });
    try {
      await axios.put(
        'http://103.245.251.149:8080/profiles/update',
        {
          address: address,
          avatar: avatar,
          bio: bio,
          birthday: birthday,
          cover: cover,
          name: name,
        },
        {
          headers: await authHeader(),
        }
      );
      navigation.navigate('SettingScreen');
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
      });
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: 'Cập nhật thất bại',
      });
    }
  };
export const changePassAction =
  (newPassword, oldPassword) => async dispatch => {
    dispatch({
      type: AUTH_REQUEST,
    });
    try {
      await axios.put(
        'http://103.245.251.149:8080/account/change-password',
        {
          newPassword: newPassword,
          oldPassword: oldPassword,
        },
        {
          headers: await authHeader(),
        }
      );
      setTimeout(() => {
        dispatch({
          type: AUTH_DONE,
        });
        dispatch({
          type: LOGOUT,
        });
        Toast.show({
          type: 'success',

          text1: 'Thông báo',
          text2: 'Đổi mật khẩu thành công.',
        });
      }, 1500);
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
      });
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };

export const activeAccAction = (otp, navigation) => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    await axios.post(
      'http://103.245.251.149:8080/account/active',
      {
        otp: otp,
      },
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: AUTH_DONE,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Kích hoạt tài khoản thành công.',
      });
      navigation.navigate('NAV');
    }, 1500);
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const getProfile = id => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://103.245.251.149:8080/profiles/${id}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: EDIT_PROFILE,
        payload: data.data.profile,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
