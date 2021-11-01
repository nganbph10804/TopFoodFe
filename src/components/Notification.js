import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import styled from 'styled-components';
import { styles } from '../styles/paper.js';

const Item = styled(View)`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 5px 20px;
  border-radius: 10px;
  margin: 2px 0;
`;
const Notification = () => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <View>
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
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
      </Item>
    </View>
  );
};

export default Notification;
