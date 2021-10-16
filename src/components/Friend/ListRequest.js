import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { acceptAction, removeActon } from "../../redux/actions/friendAction.js";

const Item = styled(View)`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 5px 20px;
  border-radius: 10px;
  margin: 2px 0;
`;
const LastItem = styled(View)`
  position: absolute;
  right: 20px;
`;
const ListRequest = ({ friend }) => {
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
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
        <Image
          source={{
            uri: `${friend.profile.avatar}`,
          }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 75,
            overflow: "hidden",
          }}
        />
        <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
          {friend.profile.name}
        </Text>
        <LastItem>
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
        </LastItem>
      </Item>
    </View>
  );
};

export default ListRequest;
