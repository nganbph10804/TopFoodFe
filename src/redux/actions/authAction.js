import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import deviceStorage from '../deviceStorage .js';
import { LOGIN_SUCCESS, LOGOUT } from '../types/authType';

export const loginAction = (username, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      'http://35.238.98.175:8080/auth/login-with-username',
      {
        username: username,
        password: password,
      }
    );
    const token = data.data.token;
    deviceStorage.saveJWT(token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Đăng nhập thành công.',
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

export const registerAction =
  (birthday, email, name, password, phone, username) => async () => {
    try {
      await axios.post('http://35.238.98.175:8080/auth/register', {
        birthday: birthday,
        email: email,
        name: name,
        password: password,
        phoneNumber: phone,
        username: username,
      });
      await axios.get(`http://35.238.98.175:8080/auth/get-otp?email=${email}`);
      Toast.show({
        type: 'success',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Đăng ký tài khoản thành công.',
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

export const getOtpAction = email => async () => {
  try {
    await axios.get(`http://35.238.98.175:8080/auth/get-otp?email=${email}`);
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Gửi mã xác nhận thành công.',
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

export const forgotAction = (email, newPassword, otp) => async () => {
  try {
    await axios.post('http://35.238.98.175:8080/auth/forgot-password', {
      email: email,
      newPassword: newPassword,
      otp: otp,
    });
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Thành công.',
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
export const logoutAction = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
  deviceStorage.deleteJWT();
  Toast.show({
    type: 'success',
    topOffset: 60,
    text1: 'Thông báo',
    text2: 'Đăng xuất thành công. Mời đăng nhập lại!!',
  });
};

export const updateProfileAction =
  (address, avatar, bio, birthday, cover, name) => async () => {
    try {
      await axios.put(
        'http://35.238.98.175:8080/profiles/update',
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
      Toast.show({
        type: 'success',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Cập nhật profile thành công.',
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
export const changePassAction = (newPassword, oldPassword) => async () => {
  try {
    await axios.put(
      'http://35.238.98.175:8080/account/change-password',
      {
        newPassword: newPassword,
        oldPassword: oldPassword,
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Đổi mật khẩu thành công.',
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

export const activeAccAction = otp => async () => {
  try {
    await axios.post(
      'http://35.238.98.175:8080/account/active',
      {
        otp: otp,
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Thông báo',
      text2: 'Kích hoạt tài khoản thành công.',
    });
  } catch (error) {
    // Toast.show({
    //   type: 'error',
    //   topOffset: 60,
    //   text1: 'Thông báo',
    //   text2: error.response.data.message,
    // });
  }
};
