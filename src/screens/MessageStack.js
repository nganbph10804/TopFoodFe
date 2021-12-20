import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';
import { Alert, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const MessageStack = () => {
  
  const onOptionSelect =  ( ) => {
    Alert.alert('Thông báo', 'Xin mời lựa chọn', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Đổi tên ',
        onPress: () => {
          
        },
      },
    ]);
  };


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
        initialParams={{ opened:false }}
        options={({ route, navigation}) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
