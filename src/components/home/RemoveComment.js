import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useDispatch } from 'react-redux';
import { removeCommentAction } from '../../redux/react/actions/reactAction.js';

const RemoveComment = ({ id, postId }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const removeComment = () => {
    Alert.alert('Thông báo', 'Bạn có muốn xoá bình luận không?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          dispatch(removeCommentAction(id, postId));
        },
      },
    ]);
  };
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
            removeComment();
          }}
        >
          Xoá
        </MenuItem>
      </Menu>
    </View>
  );
};

export default RemoveComment;
