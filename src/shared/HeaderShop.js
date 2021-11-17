import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/color.const.js';

const HeaderShop = () => {
  return (
    <View style={styled.main}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/Leomin07/img/master/logo.png',
        }}
        style={{
          width: 200,
          height: 80,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: `${COLORS.blue[4]}`,
    height: 120,
    zIndex: 100,
    width: '100%',
    paddingVertical: 20,
  },
});
export default HeaderShop;
