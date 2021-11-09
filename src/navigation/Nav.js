import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import EditProfileScreen from '../screens/Profile/EditProfileScreen.js';
import FeedScreen from '../screens/FeedScreen.js';
import EditPublicScreen from '../screens/Profile/EditPublicScreen.js';
import ProfileDetailScreen from '../screens/Profile/ProfileDetailScreen.js';
import PublicProfileScreen from '../screens/Profile/PublicProfileScreen.js';
import MessageStack from '../screens/MessageStack';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingScreen from '../screens/SettingScreen';
import SearchFriendScreen from '../screens/Friend/SearchFriendScreen.js';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ROLES } from '../constants/role.const.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StoreNavigation from './StoreNavigation.js';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Nav = () => {
  const role = useSelector(state => state.auth.account.role);
  const { avatar } = useSelector(state => state.auth.profile);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'FeedScreen') {
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
        headerShown: route.name == 'message' ? false : true,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          height: 60,
          elevation: 3,
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          title: 'Trang chủ',
        }}
      />
      {role === ROLES.ROLE_STORE && (
        <Tab.Screen
          name="Store"
          component={StoreNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      {role === ROLES.ROLE_USER && (
        <Tab.Screen
          name="SearchFriendScreen"
          component={SearchFriendScreen}
          options={{
            title: 'Tìm bạn bè',
            tabBarIcon: ({ color, size }) => {
              return <AntDesign name="search1" size={size} color={color} />;
            },
          }}
        />
      )}
      <Tab.Screen
        name="message"
        component={MessageStack}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('create new');
                }}
              >
                <Ionicons
                  name="ios-create-outline"
                  size={23}
                  style={{
                    paddingRight: 15,
                  }}
                />
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <Avatar.Image
                size={34}
                source={{
                  uri: avatar,
                }}
                style={{
                  marginLeft: 10,
                }}
              />
            );
          },
          title: 'Nhắn tin',
        }}
      />
      <Tab.Screen
        name="notification"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
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
              name="SettingScreen"
              component={SettingScreen}
              options={{
                headerShown: false,
              }}
            />
            <HomeStack.Screen
              name="ProfileDetail"
              component={ProfileDetailScreen}
              options={{
                title: 'Trang cá nhân',
              }}
            />
            <HomeStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                title: 'Cập nhật thông tin cá nhân',
              }}
            />
            <HomeStack.Screen
              name="PublicProfile"
              component={PublicProfileScreen}
              options={{
                title: 'Trang cá nhân',
              }}
            />
            <HomeStack.Screen
              name="EditPublic"
              component={EditPublicScreen}
              options={{
                title: 'Chỉnh sửa trang cá nhân',
              }}
            />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Nav;
