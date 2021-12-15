import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Chip, Paragraph, Subheading } from 'react-native-paper';
import { _ } from 'lodash';
import { formatPrice } from '../../constants/price.const';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { COLORS } from '../../constants/color.const';
import { Menu, MenuItem } from 'react-native-material-menu';
import { deleteFoodAction } from '../../redux/store/food/actions/foodAction';
import { View } from 'react-native';

const FoodsHot = ({ food, navigation }) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const handlerRemove = () => {
    Alert.alert('Thông báo', 'Bạn có muốn xoá món ăn không?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          dispatch(deleteFoodAction(food.id));
        },
      },
    ]);
  };

  const addHot = () => {
    Alert.alert('Thông báo', 'Bạn có muốn thêm món ăn hot không?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          // dispatch(addHotAction(food.id, account.id));
        },
      },
    ]);
  };

  return (
    <Card
      onPress={() => navigation.navigate('FoodDetailScreen', { food })}
      style={styled.main}
    >
      <Card.Content>
        <View style={styled.menu}>
          <Menu
            visible={visible}
            anchor={
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color="black"
                onPress={showMenu}
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                addHot();
              }}
            >
              Bỏ món ăn hot
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                navigation.navigate('EditFoodScreen', food);
              }}
            >
              Cập nhật
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                handlerRemove();
              }}
            >
              Xoá
            </MenuItem>
          </Menu>
        </View>
        <Image
          source={{ uri: `${_.head(food.files)}` }}
          style={{ width: 150, height: 150, borderRadius: 10 }}
        />
        <Subheading>{food.name} </Subheading>
        <Paragraph style={styled.price}>{formatPrice(food.price)} </Paragraph>
      </Card.Content>
      <Card.Actions>
        {food.totalReaction > 0 && (
          <Chip
            icon={() => (
              <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
            )}
          >
            {food.totalReaction} votes
          </Chip>
        )}
      </Card.Actions>
    </Card>
  );
};

const styled = StyleSheet.create({
  price: {
    fontWeight: 'bold',
  },
  main: {
    margin: 10,
  },
  menu: {
    position: 'absolute',
    right: 10,
  },
});

export default FoodsHot;
