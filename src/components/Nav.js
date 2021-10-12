import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen.js';
import FriendListScreen from '../screens/FriendListScreen.js';
import NotificationsScreen from './../screens/NotificationsScreen';
import ProfileDetailScreen from './../screens/ProfileDetailScreen';
import SettingScreen from './../screens/SettingScreen';
import MessageStack from './../screens/MessageStack';
import { Avatar, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Nav = () => {
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
          height: 60,
          elevation:3
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={FeedScreen} /> */}
      <Tab.Screen name="notification" component={NotificationsScreen} />
      <Tab.Screen 
       name="message" component={MessageStack}
       options={{
          headerRight: () => {
            return (
           <TouchableOpacity onPress={()=>{Alert.alert("create new")}}>
             <Ionicons name='ios-create-outline'  size={23} style={{
               paddingRight:15
             }}/>
           </TouchableOpacity>
          )},
          headerLeft :()=>{
            return(
              <Avatar.Image 
               size={34}
               source={{uri :'https://photo-cms-anninhthudo.zadn.vn/w600/Uploaded/2021/lcjlcanwm/2020_11_10/co-thien-lac-1-3744.jpg'}} 
               style={{
                 marginLeft:10
               }}
               />
            )
          }
        }} />
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
