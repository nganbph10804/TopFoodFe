import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FriendListScreen from '../screens/FriendListScreen.js';
import HomeScreens from '../screens/HomeScreens.js';
import MessageScreen from '../screens/MessageScreen.js';
import NotificationsScreen from '../screens/NotificationsScreen.js';
import ProfileDetailScreen from '../screens/ProfileDetailScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import { Ionicons } from '@expo/vector-icons';
import { FeedScreen } from './../screens/FeedScreen';

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
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'notification') {
            iconName = focused ? 'ios-notifications-circle' : 'ios-notifications-circle-outline';
          } else if (route.name === 'Message') {
            iconName = focused ? 'ios-mail' : 'ios-mail-outline';
          } else if (route.name === 'ProfileGroup') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerStyle:{
           backgroundColor:'light-green'
          }
      })}
      
    >
      <Tab.Screen
        name="Home"
        component={FeedScreen}

      />
      <Tab.Screen
        name="notification"
        component={NotificationsScreen}

      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
      />
      <Tab.Screen
        name="ProfileGroup"
        options={{
          headerShown: false,
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Profile" component={ProfileScreen} />
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
