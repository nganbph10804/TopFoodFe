import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { COLORS } from '../../constants/color.const.js';
import BlockListScreen from './BlockListScreen.js';
import FriendListScreen from './FriendListScreen.js';
const Tab = createMaterialTopTabNavigator();

const MainFriendScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: `${COLORS.blue[1]}`,
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tab.Screen
        name="FriendListScreen"
        component={FriendListScreen}
        options={{
          title: 'Tất cả bạn bè',
        }}
      />
      <Tab.Screen
        name="BlockListScreen"
        component={BlockListScreen}
        options={{
          title: 'Danh sách chặn',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainFriendScreen;
