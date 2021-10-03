import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreens from './src/screens/HomeScreens.js';
import LoginScreen from './src/screens/LoginScreen.js';
import NotificationsScreen from './src/screens/NotificationsScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen.js';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Đăng Nhập" component={LoginScreen} />
          <Stack.Screen name="Đăng Ký" component={RegisterScreen} />
          {/* <LoginScreen /> */}
          {/* <Tab.Navigator>
          <Tab.Screen name="Login" tab component={LoginScreen} />
          <Tab.Screen name="Home" tab component={HomeScreens} />
          <Tab.Screen name="notification" component={NotificationsScreen} />
          <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator> */}
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
