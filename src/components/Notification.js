import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { styles } from '../styles/paper.js';

const Notification = () => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <View>
      <View style={styled.item}>
        <Image
          source={{
            uri: `https://fakeimg.pl/300/`,
          }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 75,
            overflow: 'hidden',
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 10,
            }}
          >
            Thien
          </Text>
          <Text>vừa nhắc đến bạn.</Text>
        </View>
        <View style={styles.lastItem}>
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
              }}
            >
              Chấp nhận
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
              }}
            >
              Xoá
            </MenuItem>
          </Menu>
        </View>
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
});
export default Notification;
