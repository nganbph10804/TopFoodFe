import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Avatar, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { acceptAction, removeActon } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const ListRequest = ({ friend, navigation }) => {
  const profile = friend.profile;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const accept = () => {
    dispatch(acceptAction(friend.username));
  };

  const remove = () => {
    dispatch(removeActon(friend.username));
  };

  return (
    <View>
      <View style={styles.Item}>
        <Avatar.Image
          size={60}
          source={{
            uri: `${friend.profile.avatar}`,
          }}
        />
        <Title
          style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}
          onPress={() =>
            navigation.navigate('PublicProfileScreen', { profile })
          }
        >
          {friend.profile.name}
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
                accept();
              }}
            >
              Chấp nhận
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                remove();
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

export default ListRequest;
