import { AsyncStorage } from 'react-native';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
} from '../types/loginType';
import axios from 'axios';

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
  (name, email, username, phone, password) => async dispatch => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const { data } = await axios.post(
        'http://35.238.98.175:8080​/auth​/register',
        {
          name: name,
          email: email,
          username: username,
          phone: phone,
          password: password,
        }
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: error,
      });
    }
  };

export const logoutAction = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
export const loadUserAction = () => (dispatch, getState) => {
  const token = getState().auth.token;
  if (token) {
    dispatch({
      type: LOAD_USER,
    });
  } else return null;
};
