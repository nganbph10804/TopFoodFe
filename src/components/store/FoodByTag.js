import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { formatPrice } from '../../constants/price.const.js';
import { styled } from '../../styles/store.js';
import { _ } from 'lodash';

const FoodByTag = ({ food, navigation, tagId, tagName }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SubFoodScreen', { tagId, food, tagName })
      }
    >
      <View style={styled.container}>
        <View style={{ width: '25%' }}>
          <Image
            source={{ uri: `${_.head(food.files)}` }}
            style={styled.image}
          />
        </View>
        <View>
          <Text style={styled.textName}>{food.name}</Text>
          <Text style={styled.textPrice}>{formatPrice(food.price)} </Text>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default FoodByTag;
