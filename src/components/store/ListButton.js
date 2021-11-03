import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';

const ListButton = ({ navigation }) => {
  return (
    <View style={style.main}>
      <Button
        mode="contained"
        color={`${COLORS.blue[1]}`}
        onPress={() => navigation.navigate('CreateFoodScreen')}
      >
        Tạo món ăn
      </Button>
      <Button mode="contained" color={`${COLORS.blue[1]}`}>
        Tạo bài viết
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});
export default ListButton;
