import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { sendAction } from "../../redux/actions/friendAction.js";

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
const SearchFriend = ({ item }) => {
  const dispatch = useDispatch();
  const handlerSend = () => {
    dispatch(sendAction(item.phoneNumber));
  };

  return (
    <View>
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
        <Image
          source={{
            uri: `${item.profile.avatar}`,
          }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 75,
            overflow: "hidden",
          }}
        />
        <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
          {item.profile.name}
        </Text>
        <LastItem>
          <Button onPress={() => handlerSend()}>Kết bạn</Button>
        </LastItem>
      </Item>
    </View>
  );
};

export default SearchFriend;
