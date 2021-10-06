import React from 'react';
import MessageScreen from './screens/MessageScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HomeScreens from './screens/HomeScreens';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();




export const BottomTabs = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
       initialRouteName="Home"
        shifting={true}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'md-home'
              : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'mail' : 'mail-outline';
          }else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications-circle' : 'ios-notifications-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
           headerShown: false 
        })}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreens}
          
        />
         <Tab.Screen
          name="Messages"
          component={MessageScreen}
         
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
       
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
