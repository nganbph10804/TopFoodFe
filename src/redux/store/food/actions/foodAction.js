import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../../../authHeader.js';
import { CLEAR_FILE } from '../../../file/types/fileType.js';
import { GET_TAG_ID } from '../../tag/type/tagType.js';
import {
  CLEAR_SEARCH,
  DELETE_FOOD,
  FILTER_FOOD,
  FOOD_DETAIL,
  FOOD_FAILURE,
  FOOD_LIST,
  FOOD_REQUEST,
  SEARCH_FOOD,
} from '../types/foodType.js';

export const foodListAction = id => async dispatch => {
  dispatch({
    type: FOOD_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/list-food?accountId=${id}&page=0&pageSize=1000`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOOD_LIST,
      payload: data.data.data,
    });
    dispatch({
      type: CLEAR_FILE,
    });
  } catch (error) {
    dispatch({
      type: FOOD_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const foodDetailAction = id => async dispatch => {
  dispatch({
    type: FOOD_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/store-profile/food/${id}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: FOOD_DETAIL,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FOOD_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const createFoodAction =
  (content, files, name, price, tagId, navigation) => async dispatch => {
    dispatch({
      type: FOOD_REQUEST,
    });
    try {
      await axios.post(
        'http://58.84.1.32:8080/store-profile/food/create',
        {
          content: content,
          files: files,
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
          text1: 'Thông báo',
          text2: 'Tạo món ăn thành công',
        });
        if (navigation) {
          navigation.navigate('FoodListScreen');
        }
      }, 1000);
    } catch (error) {
      dispatch({
        type: FOOD_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };

export const updateFoodAction =
  (content, files, id, name, price, tagId, navigation) => async dispatch => {
    dispatch({
      type: FOOD_REQUEST,
    });
    try {
      await axios.put(
        'http://58.84.1.32:8080/store-profile/food/update',
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
          text1: 'Thông báo',
          text2: 'Cập nhật món ăn thành công',
        });
        navigation.navigate('FoodListScreen');
      }, 1000);
    } catch (error) {
      dispatch({
        type: FOOD_FAILURE,
      });
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  };
export const deleteFoodAction = (id, tagId) => async dispatch => {
  dispatch({
    type: FOOD_REQUEST,
  });
  try {
    await axios.delete(
      `http://58.84.1.32:8080/store-profile/food/delete/${id}`,
      {
        headers: await authHeader(),
      }
    );
    const { data } = await axios.get(
      `http://58.84.1.32:8080/api/tag/store/${tagId}`,
      {
        headers: await authHeader(),
      }
    );
    dispatch({
      type: GET_TAG_ID,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: DELETE_FOOD,
        payload: id,
      });
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Xoá món ăn thành công',
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: FOOD_FAILURE,
    });
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};

export const filterFoodAction = tagId => async dispatch => {
  dispatch({
    type: FOOD_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://58.84.1.32:8080/api/tag/${tagId}`,
      {
        headers: await authHeader(),
      }
    );
    setTimeout(() => {
      dispatch({
        type: FILTER_FOOD,
        payload: data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: FOOD_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const searchFoodAction = value => dispatch => {
  dispatch({
    type: SEARCH_FOOD,
    payload: value,
  });
};
export const clearSearchAction = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};
