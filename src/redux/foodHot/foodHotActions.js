import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import { FOOD_LIST } from '../store/food/types/foodType.js';
import { FAILURE, HOT_LIST, REQUEST } from './foodHotType.js';

export const hotListAction = accountId => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/food-hot?accountId=${accountId}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: HOT_LIST,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const addHotAction = (foodId, storeId) => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    await axios.post(
      `http://58.84.1.32:8080/store-profile/food-hot/${foodId}`,
      {},
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-food?accountId=${storeId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOOD_LIST,
      payload: data.data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Thêm món ăn hot thành công',
    });
  } catch (error) {
    dispatch({
      type: FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const deleteHotAction = (foodId, storeId) => async dispatch => {
  dispatch({
    type: REQUEST,
  });
  try {
    await axios.delete(
      `http://58.84.1.32:8080/store-profile/food-hot/delete/${foodId}`,
      {},
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-food?accountId=${storeId}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOOD_LIST,
      payload: data.data.data,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Thêm món ăn hot thành công',
    });
  } catch (error) {
    dispatch({
      type: FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
