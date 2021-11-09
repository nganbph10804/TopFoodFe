import React from 'react';
import { Image, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { formatPrice } from '../../constants/price.const.js';
import { styled } from '../../styles/store.js';

const FoodByTag = ({ food }) => {
  return (
    <View>
      <View style={styled.container}>
        <View style={{ width: '25%' }}>
          <Image source={{ uri: `${food.files[1]}` }} style={styled.image} />
        </View>
        <View>
          <Text style={styled.textName}>{food.name}</Text>
          <Text style={styled.textPrice}>{formatPrice(food.price)} </Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default FoodByTag;
