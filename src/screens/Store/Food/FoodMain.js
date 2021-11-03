import React from 'react';
import { View } from 'react-native';
import ListButton from '../../../components/store/ListButton.js';

const FoodMain = ({ navigation }) => {
  return (
    <View>
      <ListButton navigation={navigation} />
    </View>
  );
};

export default FoodMain;
