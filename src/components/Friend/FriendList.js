import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Avatar, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  blockFriendAction,
  unfriendAction,
} from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const FriendList = ({ item, navigation }) => {
  const profile = item.profile;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const handlerBlock = phone => {
    dispatch(blockFriendAction(phone));
  };

  const handlerUnfriend = phone => {
    dispatch(unfriendAction(phone));
  };

  return (
    <View>
      <View style={styles.Item}>
        <Avatar.Image
          size={60}
          source={{
            uri: `${item.profile.avatar}`,
          }}
        />
        <Title
          style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}
          onPress={() =>
            navigation.navigate('PublicProfileScreen', { profile })
          }
        >
          {item.profile.name}
        </Title>
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
                handlerUnfriend(item.phoneNumber);
              }}
            >
              Huỷ kết bạn
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                handlerBlock(item.phoneNumber);
              }}
            >
              Chặn
            </MenuItem>
          </Menu>
        </View>
      </View>
    </View>
  );
};

export default FriendList;
