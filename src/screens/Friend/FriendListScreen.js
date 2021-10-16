import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FriendList from "../../components/Friend/FriendList.js";
import { InputSearch, Main } from "../../components/index.js";
import { friendListAction } from "../../redux/actions/friendAction.js";

const FriendListScreen = ({ navigation }) => {
  const { friend } = useSelector((state) => state.friend);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => {
    dispatch(friendListAction(page));
  }, [dispatch, page]);
  return (
    <Main>
      {friend.length === 0 ? (
        <View>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Không có bạn bè.
          </Text>
        </View>
      ) : (
        <View>
          <View>
            <View style={{ position: "relative", width: "100%" }}>
              <AntDesign
                name="search1"
                size={24}
                color="#000"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "25%",
                  left: "4%",
                }}
              />
              <InputSearch
                placeholder="Tìm bạn bè"
                value={search}
                onChangeText={(search) => setSearch(search)}
              />
            </View>
          </View>
          <View>
            {friend.map((item, index) => (
              <FriendList key={index} item={item} navigation={navigation} />
            ))}
          </View>
        </View>
      )}
    </Main>
  );
};

export default FriendListScreen;
