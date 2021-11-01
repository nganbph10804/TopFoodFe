import axios from 'axios';
import { authHeader } from '../../authHeader.js';
import {
  DELETE_FOOD,
  FOOD_DETAIL,
  FOOD_LIST,
  STORE_FAILURE,
  STORE_REQUEST,
  UPDATE_FOOD,
} from '../types/storeType.js';

export const foodListAction = () => async dispatch => {
  dispatch({
    type: STORE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/store-profile/list-food`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: FOOD_LIST,
        payload: data.data,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: STORE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const foodDetailAction = id => async dispatch => {
  dispatch({
    type: STORE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://34.67.241.66:8080/store-profile/food/${id}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: FOOD_DETAIL,
        payload: data.data,
      });
      Toast.show({
        type: 'success',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Xoá món ăn thành công',
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: STORE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const createFoodAction =
  (content, files, id, name, price, tagId) => async dispatch => {
    dispatch({
      type: STORE_REQUEST,
    });
    try {
      await axios.post(
        'http://34.67.241.66:8080/store-profile/food/create',
        {
          content: content,
          files: files,
          id: id,
          name: name,
          price: price,
          tagId: tagId,
        },
        {
          headers: await authHeader(),
        }
      );
      setTimeout(() => {
        Toast.show({
          type: 'success',
          topOffset: 60,
          text1: 'Thông báo',
          text2: 'Tạo món ăn thành công',
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: STORE_FAILURE,
      });
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const updateFoodAction =
  (content, files, id, name, price, tagId) => async dispatch => {
    dispatch({
      type: STORE_REQUEST,
    });
    try {
      const { data } = await axios.put(
        'http://34.67.241.66:8080/store-profile/food/update',
        {
          content: content,
          files: files,
          id: id,
          name: name,
          price: price,
          tagId: tagId,
        },
        {
          headers: await authHeader(),
        }
      );
      setTimeout(() => {
        dispatch({
          type: UPDATE_FOOD,
          payload: data.data,
        });
        Toast.show({
          type: 'success',
          topOffset: 60,
          text1: 'Thông báo',
          text2: 'Cập nhật món ăn thành công',
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: STORE_FAILURE,
      });
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const deleteFoodAction = id => async dispatch => {
  dispatch({
    type: STORE_REQUEST,
  });
  try {
    await axios.delete(
      `http://34.67.241.66:8080/store-profile/food/delete/${id}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: DELETE_FOOD,
        payload: id,
      });
      Toast.show({
        type: 'success',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Xoá món ăn thành công',
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: STORE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 60,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
