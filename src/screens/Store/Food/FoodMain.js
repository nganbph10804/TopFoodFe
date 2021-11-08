import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FoodList from '../../../components/store/FoodList.js';
import ListButton from '../../../components/store/ListButton.js';
import { COLORS } from '../../../constants/color.const.js';
import { foodListAction } from '../../../redux/store/food/actions/foodAction.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';

const FoodMain = ({ navigation }) => {
  const food = useSelector(state => state.food.food);
  const loading = useSelector(state => state.food.loading);
  const profile = useSelector(state => state.auth.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(foodListAction());
    });
    return focus;
  }, [dispatch]);
  return (
    <View style={styles.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
    </View>
  );
};

export default FoodMain;
