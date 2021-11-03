import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatScreen from './ChatScreen';
import MessageScreen from './MessageScreen';

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        options={() => ({
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
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
