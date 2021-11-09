import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';
import {
  deleteFoodAction,
  foodDetailAction,
} from '../../redux/store/food/actions/foodAction.js';

const FilterCtg = ({ foods, navigation, tagName }) => {
  const detail = useSelector(state => state.food.detail);
  const food = detail;
  const dispatch = useDispatch();
  const handlerOption = () => {
    setIsVisible(true);
  };
  const handlerRemove = () => {
    dispatch(deleteFoodAction(foods.id));
    setIsVisible(false);
  };
  useEffect(() => {
    dispatch(foodDetailAction(foods.id));
  }, [dispatch]);
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: 'Cập nhật',
      titleStyle: { color: `${COLORS.blue[1]}` },
      onPress: () => navigation.navigate('EditFoodScreen', foods),
    },
    {
      title: 'Xoá',
      titleStyle: { color: 'red' },
      onPress: () => handlerRemove(),
    },
    {
      title: 'Cancel',
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <TouchableOpacity
      onLongPress={() => handlerOption()}
      onPress={() => navigation.navigate('FoodDetailScreen', { food })}
    >
      <View style={styled.container}>
        <View style={styled.main}>
          <View style={{ width: '32%' }}>
            <Image source={{ uri: `${foods.files[1]}` }} style={styled.image} />
          </View>
          <View>
            <Text style={styled.textName}>{foods.name}</Text>
            <Text style={styled.textTag}>{tagName} </Text>
            <Text style={styled.textPrice}>{formatPrice(foods.price)} </Text>
          </View>
        </View>
        <Divider />
      </View>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
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
export default FilterCtg;
