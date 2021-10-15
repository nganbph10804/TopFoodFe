import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import EditProfileScreen from '../screens/EditProfileScreen.js';
import FriendListScreen from '../screens/FriendListScreen.js';
import PublicProfileScreen from '../screens/PublicProfileScreen.js';
import SearchFriendScreen from '../screens/SearchFriendScreen.js';
import MessageStack from './../screens/MessageStack';
import NotificationsScreen from './../screens/NotificationsScreen';
import ProfileDetailScreen from './../screens/ProfileDetailScreen';
import SettingScreen from './../screens/SettingScreen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const Nav = () => {
  const { cover, avatar, address, birthday, bio, name,id } = useSelector(
    state => state.auth.profile
  );
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
          } else if (route.name === 'Messages') {
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
          elevation: 3,
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={FeedScreen} /> */}
      <Tab.Screen name="notification" component={NotificationsScreen} />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          headerLeft: () => {
            return (
              <Avatar.Image
                size={34}
                source={{
                  uri: avatar
                }}
                style={{
                  marginLeft: 10,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        options={{
          headerShown: false,
        }}
      >
        {() => (
          <HomeStack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
            }}
          >
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
              options={{
                title: 'TRANG CÁ NHÂN',
              }}
            />
            <HomeStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                title: 'CẬP NHẬT THÔNG TIN CÁ NHÂN',
              }}
            />
            <HomeStack.Screen
              name="PublicProfile"
              component={PublicProfileScreen}
              options={{
                title: 'TRANG CÁ NHÂN',
              }}
            />
            <HomeStack.Screen
              name="Friends"
              component={FriendListScreen}
              options={{
                title: 'DANH SÁCH BẠN BÈ',
                headerShown: false,
              }}
            />
            <HomeStack.Screen
              name="SearchFriend"
              component={SearchFriendScreen}
              options={{
                title: 'TÌM BẠN',
                headerShown: false,
              }}
            />

            {/* <HomeStack.Screen name="Friends" component={FriendListScreen} /> */}
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Nav;
