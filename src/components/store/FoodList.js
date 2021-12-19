import { AntDesign, Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Card, Chip, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { formatPrice } from '../../constants/price.const.js';
import { addHotAction } from '../../redux/foodHot/foodHotActions.js';
import { deleteFoodAction } from '../../redux/store/food/actions/foodAction.js';

const FoodList = ({ food, navigation, storeId }) => {
  const account = useSelector(state => state.auth.account);
  const dispatch = useDispatch();
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
          dispatch(addHotAction(food.id, account.id));
        },
      },
    ]);
  };

  return (
    <Card
      style={styled.container}
      onPress={() => navigation.navigate('FoodDetailScreen', { food })}
    >
      <Card.Content style={styled.main}>
        {storeId === account.id && (
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
                Thêm món ăn hot
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
        )}
        <View style={{ width: '32%' }}>
          <Image
            source={{ uri: `${_.head(food.files)}` }}
            style={styled.image}
          />
        </View>
        <View>
          <Text style={styled.textName}>{food.name}</Text>
          <Text style={styled.textTag}>{food.tag.tagName} </Text>
          <Text style={styled.textPrice}>{formatPrice(food.price)} </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        {food.totalReaction > 0 && (
          <Chip
            icon={() => (
              <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
            )}
            style={styled.vote}
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
    margin: 10,
  },
  vote: {
    position: 'absolute',
    right: 20,
  },
  menu: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
});
export default FoodList;
