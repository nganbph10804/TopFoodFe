import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen.js';
import FriendListScreen from '../screens/FriendListScreen.js';
import MessageScreen from '../screens/MessageScreen.js';
import FeedScreen from './../screens/FeedScreen';
import NotificationsScreen from './../screens/NotificationsScreen';
import ProfileDetailScreen from './../screens/ProfileDetailScreen';
import SettingScreen from './../screens/SettingScreen';
// import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Nav = () => {
  // const auth = useSelector(state => state.auth);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'notification') {
            iconName = focused
              ? 'ios-notifications-circle'
              : 'ios-notifications-circle-outline';
          } else if (route.name === 'message') {
            iconName = focused ? 'ios-mail' : 'ios-mail-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'light-green',
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={FeedScreen} /> */}
      <Tab.Screen name="notification" component={NotificationsScreen} />
      {/* <Tab.Screen name="message" component={MessageScreen} /> */}
      <Tab.Screen
        name="Menu"
        options={{
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
            <HomeStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
            />
            <HomeStack.Screen name="Friends" component={FriendListScreen} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Nav;
