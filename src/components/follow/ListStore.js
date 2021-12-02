import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Avatar, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { unFollowAction } from '../../redux/follow/followAction.js';

const ListStore = ({ store, navigation }) => {
  const { storeId } = store;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const handlerUnFollow = () => {
    dispatch(unFollowAction(storeId));
  };
  return (
    <View style={styled.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StoreClient', { storeId })}
      >
        <Avatar.Image
          size={60}
          source={{
            uri: `${store.avatar}`,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('StoreClient', { storeId })}
      >
        <Subheading style={styled.text}>{store.name}</Subheading>
      </TouchableOpacity>
      <View style={styled.lastItem}>
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
              handlerUnFollow();
            }}
          >
            Bỏ theo dõi
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20,
  },
  text: {
    marginLeft: 10,
  },
  lastItem: {
    position: 'absolute',
    right: 20,
  },
});

export default ListStore;
