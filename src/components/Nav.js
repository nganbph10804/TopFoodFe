import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import FriendListScreen from '../screens/FriendListScreen.js';
import HomeScreens from '../screens/HomeScreens.js';
import MessageScreen from '../screens/MessageScreen.js';
import NotificationsScreen from '../screens/NotificationsScreen.js';
import ProfileDetailScreen from '../screens/ProfileDetailScreen.js';
import SettingScreen from '../screens/SettingScreen.js';
import deviceStorage from './deviceStore.js';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Nav = () => {
  const auth = useSelector(state => state.auth);
  console.log('log 🚀 ~ file: Nav.js ~ line 16 ~ Nav ~ auth', auth);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarIcon: () => <Icon size={30} name={'home'} color={'black'} />,
        }}
      />
      <Tab.Screen
        name="notification"
        component={NotificationsScreen}
        options={{
          tabBarIcon: () => (
            <Icon size={30} name={'notifications-active'} color={'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="message"
        component={MessageScreen}
        options={{
          tabBarIcon: () => (
            <Icon size={30} name={'question-answer'} color={'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingGroup"
        options={{
          tabBarIcon: () => <Icon size={30} name={'menu'} color={'black'} />,
          headerShown: false,
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name="Setting"
              component={SettingScreen}
              options={{
                headerShown: false,
              }}
            />
            <HomeStack.Screen
              name="ProfileDetail"
              component={ProfileDetailScreen}
            />
            <HomeStack.Screen name="Friends" component={FriendListScreen} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Nav;
