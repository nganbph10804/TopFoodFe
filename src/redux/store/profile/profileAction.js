import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../authHeader.js';
import { PROFILE, PROFILE_FAILURE, PROFILE_REQUEST } from './profileType.js';

export const getProfileStoreAction = id => async dispatch => {
  dispatch({
    type: PROFILE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://103.245.251.149:8080/store-profile/wall/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: PROFILE,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
