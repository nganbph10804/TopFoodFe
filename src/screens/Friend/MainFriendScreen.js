import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import FriendListScreen from './FriendListScreen.js';
import SearchFriendScreen from './SearchFriendScreen.js';
const Tab = createMaterialTopTabNavigator();

const MainFriendScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SearchFriend"
        component={SearchFriendScreen}
        options={{
          title: 'TÌM BẠN',
        }}
      />
      <Tab.Screen
        name="FriendListScreen"
        component={FriendListScreen}
        options={{
          title: 'DANH SÁCH BẠN BÈ',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainFriendScreen;
