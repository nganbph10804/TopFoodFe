import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { Avatar, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  blockFriendAction,
  unfriendAction,
} from "../../redux/actions/friendAction.js";

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
const FriendList = ({ item, navigation }) => {
  const profile = item.profile;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const handlerBlock = (phone) => {
    dispatch(blockFriendAction(phone));
  };

  const handlerUnfriend = (phone) => {
    dispatch(unfriendAction(phone));
  };

  return (
    <View>
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
        <Avatar.Image
          size={60}
          source={{
            uri: `${item.profile.avatar}`,
          }}
        />
        <Title
          style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}
          onPress={() =>
            navigation.navigate("PublicProfileScreen", { profile })
          }
        >
          {item.profile.name}
        </Title>
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
        </LastItem>
      </Item>
    </View>
  );
};

export default FriendList;
