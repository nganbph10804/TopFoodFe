import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

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
        initialParams={{ opened:false }}
        options={({ route, navigation}) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
          headerRight : () => (
           <TouchableOpacity onPress={()=>{}} style={{marginRight:10}}>
             <Ionicons name='people' size={23} color='blue'/>
           </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
