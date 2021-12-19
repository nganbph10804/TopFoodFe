import { AntDesign } from '@expo/vector-icons';
import { _ } from 'lodash';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Card, Chip, Divider, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';
import { styled } from '../../styles/store.js';

const FoodByTag = ({ food, navigation, tagId }) => {
  return (
    <Card
      onPress={() => navigation.navigate('SubFoodScreen', { food, tagId })}
      style={{ margin: 10 }}
    >
      <Card.Content style={styled.container}>
        <View style={{ width: '35%' }}>
          <Image
            source={{ uri: `${_.head(food.files)}` }}
            style={styled.image}
          />
        </View>
        <View>
          <Subheading style={styled.textName}>{food.name}</Subheading>
          <Subheading style={styled.textPrice}>
            {formatPrice(food.price)}
          </Subheading>
        </View>
      </Card.Content>
      {food.totalReaction > 0 && (
        <Chip style={{ position: 'absolute', right: 20, bottom: 0 }}>
          <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
          <Subheading style={{ color: `${COLORS.blue[4]}` }}>
            {food.totalReaction} votes
          </Subheading>
        </Chip>
      )}
    </Card>
  );
};

export default FoodByTag;
