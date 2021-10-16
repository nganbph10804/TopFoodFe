import React from "react";
import { Text, View } from "react-native";
import Notification from "../components/Notification.js";
import ListRequestScreen from "./Friend/ListRequestScreen.js";

const NotificationsScreen = () => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View>
        <ListRequestScreen />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: 10,
          paddingBottom: 10,
          margin: 10,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Trước đó</Text>
      </View>
      <View style={{ backgroundColor: "#fff" }}>
        <View>
          <Notification />
        </View>
      </View>
    </View>
  );
};

export default NotificationsScreen;
