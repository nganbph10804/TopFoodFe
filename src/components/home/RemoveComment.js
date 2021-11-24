import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';

const RemoveComment = () => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <View style={{ position: 'absolute', right: 10 }}>
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
          Xoá
        </MenuItem>
      </Menu>
    </View>
  );
};

export default RemoveComment;
