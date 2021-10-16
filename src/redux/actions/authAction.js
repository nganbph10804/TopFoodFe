import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import deviceStorage from '../deviceStorage .js';
import { LOGIN_SUCCESS, LOGOUT, EDIT_PROFILE } from '../types/authType';

export const loginAction = (username, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      'http://34.67.241.66:8080/auth/login-with-username',
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
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Đăng nhập thành công.',
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

export const registerAction =
  (birthday, email, name, password, phone, username, navigation) =>
  async () => {
    try {
      await axios.post('http://34.67.241.66:8080/auth/register', {
        birthday: birthday,
        email: email,
        name: name,
        password: password,
        phoneNumber: phone,
        username: username,
      });
      await axios.get(`http://34.67.241.66:8080/auth/get-otp?email=${email}`);
      const { data } = await axios.post(
        'http://34.67.241.66:8080/auth/login-with-username',
        {
          username: username,
          password: password,
        }
      );
      const token = data.data.token;
      deviceStorage.saveJWT(token);
      Toast.show({
        type: 'success',
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Đăng ký tài khoản thành công.',
      });
      navigation.navigate('Active');
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };

export const getOtpAction = (email, navigation) => async () => {
  try {
    await axios.get(`http://34.67.241.66:8080/auth/get-otp?email=${email}`);
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Gửi mã xác nhận thành công.',
    });
    navigation.navigate('FORGOT_PASSWORD', { email });
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const forgotAction =
  (email, newPassword, otp, navigation) => async () => {
    try {
      await axios.post('http://34.67.241.66:8080/auth/forgot-password', {
        email: email,
        newPassword: newPassword,
        otp: otp,
      });
      Toast.show({
        type: 'success',
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Thành công.',
      });
      navigation.navigate('LOGIN');
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const logoutAction = () => dispatch => {
  Toast.show({
    type: 'success',
    topOffset: 40,
    text1: 'Thông báo',
    text2: 'Đăng xuất thành công. Mời đăng nhập lại!!',
  });
  dispatch({
    type: LOGOUT,
  });
  deviceStorage.deleteJWT();
};

export const updateProfileAction =
  (address, avatar, bio, birthday, cover, name, navigation, id) =>
  async dispatch => {
    try {
      await axios.put(
        'http://34.67.241.66:8080/profiles/update',
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
      const { data } = await axios.get(
        `http://34.67.241.66:8080/profiles/${id}`,
        {
          headers: await authHeader(),
        }
      );
      dispatch({
        type: EDIT_PROFILE,
        payload: data.data.profile,
      });
      Toast.show({
        type: 'success',
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Cập nhật profile thành công.',
      });
      navigation.navigate('Setting');
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const changePassAction =
  (newPassword, oldPassword, navigation) => async () => {
    try {
      await axios.put(
        'http://34.67.241.66:8080/account/change-password',
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
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Đổi mật khẩu thành công.',
      });
      navigation.navigate('LOGIN');
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };

export const activeAccAction = (otp, navigation) => async () => {
  try {
    await axios.post(
      'http://34.67.241.66:8080/account/active',
      {
        otp: otp,
      },
      {
        headers: await authHeader(),
      }
    );
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Kích hoạt tài khoản thành công.',
    });
    navigation.navigate('LOGIN');
    deviceStorage.deleteJWT();
  } catch (error) {
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
