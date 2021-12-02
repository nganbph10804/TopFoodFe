import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, Divider, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';
import { AntDesign } from '@expo/vector-icons';

const SearchFood = ({ food, navigation }) => {
  return (
    <TouchableOpacity
      onLongPress={() => handlerOption()}
      onPress={() => navigation.navigate('FoodDetailScreen', { food })}
    >
      <View style={styled.container}>
        <View style={styled.main}>
          <View style={{ width: '32%' }}>
            <Image source={{ uri: `${food.files[1]}` }} style={styled.image} />
          </View>
          <View>
            <Text style={styled.textName}>{food.name}</Text>
            <Text style={styled.textTag}>{food.tag.tagName} </Text>
            <Text style={styled.textPrice}>{formatPrice(food.price)} </Text>
          </View>
          <View
            style={{ alignSelf: 'center', position: 'absolute', right: 20 }}
          >
            <Chip>
              <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
              <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                {food.totalReaction} votes
              </Subheading>
            </Chip>
          </View>
        </View>
        <Divider />
      </View>
    </TouchableOpacity>
  );
};

const styled = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    borderColor: '#ccc',
    borderRadius: 10,
    width: 110,
    height: 110,
  },
  textName: {
    fontSize: 17,
  },
  textTag: {
    fontSize: 13,
    color: '#968299',
    marginTop: 5,
  },
  textPrice: {
    fontSize: 16,
    marginTop: 20,
  },
  container: {
    backgroundColor: '#fff',
  },
});
export default SearchFood;
