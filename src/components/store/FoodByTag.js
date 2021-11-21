import { AntDesign } from '@expo/vector-icons';
import { _ } from 'lodash';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Chip, Divider, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';
import { styled } from '../../styles/store.js';

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
        <View style={{ position: 'absolute', right: 20, top: 30 }}>
          <Chip>
            <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
            <Subheading style={{ color: `${COLORS.blue[4]}` }}>
              26 votes
            </Subheading>
          </Chip>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default FoodByTag;
