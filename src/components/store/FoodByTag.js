import { AntDesign } from '@expo/vector-icons';
import { _ } from 'lodash';
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Card, Chip, Paragraph, Subheading, Title } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';

const FoodByTag = ({ food, navigation, tagId, tagName }) => {
  return (
    <Card
      onPress={() =>
        navigation.navigate('SubFoodScreen', { tagId, food, tagName })
      }
      style={styled.main}
    >
      <Card.Content style={styled.item}>
        <View style={{ width: '35%' }}>
          <Image
            source={{ uri: `${_.head(food.files)}` }}
            style={styled.image}
          />
        </View>
        <View>
          <Title>{food.name}</Title>
          <Paragraph style={styled.price}>{formatPrice(food.price)} </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        {food.totalReaction > 0 && (
          <Chip
            style={{ position: 'absolute', right: 10 }}
            icon={() => (
              <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
            )}
          >
            <Subheading style={{ color: `${COLORS.blue[4]}` }}>
              {food.totalReaction} votes
            </Subheading>
          </Chip>
        )}
      </Card.Actions>
    </Card>
  );
};

const styled = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
  },
  price: {
    fontSize: 16,
  },
  image: {
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  main: {
    margin: 10,
  },
});

export default FoodByTag;
