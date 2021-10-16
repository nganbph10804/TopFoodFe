import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ListRequest from "../../components/Friend/ListRequest.js";
import { listRequestAction } from "../../redux/actions/friendAction.js";

const ListRequestScreen = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.friend.request);
  useEffect(() => {
    dispatch(listRequestAction(page));
  }, [dispatch, page]);

  return (
    <View>
      {request.length === 0 ? (
        <Text></Text>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="people-alt" size={30} color="black" />
            <Text
              style={{ fontSize: 20, paddingHorizontal: 5, fontWeight: "bold" }}
            >
              Lời mời kết bạn
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: 50,
                width: 35,
                height: 35,
                textAlign: "center",
                paddingTop: 5,
                fontSize: 17,
              }}
            >
              99
            </Text>
          </View>
          <View>
            {request.map((friend, key) => (
              <ListRequest key={key} friend={friend} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ListRequestScreen;
