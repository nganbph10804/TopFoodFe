import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  GET_OTP,
  GET_OTP_FAILED,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from '../types/authType';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (username, password) => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const { data } = await axios.post(
      'http://35.238.98.175:8080/auth/login-with-username',
      {
        username: username,
        password: password,
      }
    );
    await AsyncStorage.setItem('token', data.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error,
    });
  }
};

export const registerAction =
  (email, name, password, phone, username) => async dispatch => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const { data } = await axios.post(
        'http://35.238.98.175:8080/auth/register',
        {
          email: email,
          name: name,
          password: password,
          phoneNumber: phone,
          username: username,
        }
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: error,
      });
    }
  };

export const getOtpAction = email => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://35.238.98.175:8080/auth/get-otp?email=${email}`
    );
    dispatch({
      type: GET_OTP,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: GET_OTP_FAILED,
      payload: error,
    });
  }
};

export const forgotAction = (email, newPassword, otp) => async dispatch => {
  dispatch({
    type: FORGOT_REQUEST,
  });
  try {
    const { data } = await axios.post(
      'http://35.238.98.175:8080/auth/forgot-password',
      {
        email: email,
        newPassword: newPassword,
        otp: otp,
      }
    );
    dispatch({
      type: FORGOT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_FAILED,
      payload: error,
    });
  }
};
export const logoutAction = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
