import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessageScreen from "./MessageScreen";
import ChatScreen from "./ChatScreen";
import { Button } from "react-native";

const Stack = createStackNavigator();

const MessageStack = ({ navigation }) => {
  return (
    <Stack.Navigator
  
    >
      <Stack.Screen
        name="Messages"
        options={({ route }) => ({
          headerShown: false,
        })}
        component={MessageScreen}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
          headerRight : () => (
            <Button title="hihi" onPress={() =>{}} />
          )
        })}
        
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
