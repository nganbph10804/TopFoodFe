import axios from 'axios';
import Toast from 'react-native-toast-message';
import { authHeader } from '../authHeader.js';
import { FOOD_DETAIL } from '../store/food/types/foodType.js';
import { UN_VOTE, VOTE_FAILURE, VOTE_FOOD, VOTE_REQUEST } from './voteType.js';

export const voteFoodAction = id => async dispatch => {
  dispatch({
    type: VOTE_REQUEST,
  });
  try {
    await axios.post(
      `http://58.84.1.32:8080/store-profile/food-reaction`,
      {
        foodId: id,
      },
      {
        headers: await authHeader(),
      }
    );
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
    dispatch({
      type: VOTE_FOOD,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Vote món ăn thành công',
    });
  } catch (error) {
    dispatch({
      type: VOTE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
export const unVoteFoodAction = id => async dispatch => {
  dispatch({
    type: VOTE_REQUEST,
  });
  try {
    await axios.delete(`http://58.84.1.32:8080/store-profile/food-reaction`, {
      data: { foodId: id },
      headers: await authHeader(),
    });
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
    dispatch({
      type: UN_VOTE,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Bỏ vote món ăn thành công',
    });
  } catch (error) {
    dispatch({
      type: VOTE_FAILURE,
    });
    Toast.show({
      type: 'error',
      topOffset: 40,
      text1: 'Thông báo',
      text2: error.response.data.message,
    });
  }
};
