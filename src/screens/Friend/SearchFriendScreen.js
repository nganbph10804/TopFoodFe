import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ListRequest from "../../components/Friend/ListRequest.js";
import SearchFriend from "../../components/Friend/SearchFriend.js";
import { InputSearch, Main } from "../../components/index.js";
import {
  listRequestAction,
  searchProfileAction,
} from "../../redux/actions/friendAction.js";

const SearchFriendScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const profile = useSelector((state) => state.friend.search);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const handlerSearch = () => {
    dispatch(searchProfileAction(searchValue, page));
  };
  const request = useSelector((state) => state.friend.request);
  useEffect(() => {
    dispatch(listRequestAction(page));
  }, [dispatch]);
  return (
    <Main>
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
          minLength={10}
          maxLength={10}
          value={searchValue}
          onChangeText={(searchValue) => setSearchValue(searchValue)}
          onSubmitEditing={() => handlerSearch()}
        />
      </View>
      <View>
        {profile.map((item, key) => (
          <SearchFriend key={key} item={item} />
        ))}
      </View>
      <View>
        {request.map((friend, key) => (
          <ListRequest key={key} friend={friend} />
        ))}
      </View>
    </Main>
  );
};

export default SearchFriendScreen;
