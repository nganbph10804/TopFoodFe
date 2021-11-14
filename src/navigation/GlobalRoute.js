import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/color.const.js';
import ActiveAccScreen from '../screens/Auth/ActiveAccScreen.js';
import ChangePassScreen from '../screens/Auth/ChangePassScreen.js';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen.js';
import LoginScreen from '../screens/Auth/LoginScreen.js';
import RegisterScreen from '../screens/Auth/RegisterScreen.js';
import VerifyScreen from '../screens/Auth/VerifyScreen.js';
import MainFriendScreen from '../screens/Friend/MainFriendScreen.js';
import InformationAccScreen from '../screens/Profile/InformationAccScreen.js';
import PublicProfileScreen from '../screens/Profile/PublicProfileScreen.js';
import Nav from './Nav.js';

const Stack = createStackNavigator();
const GlobalRoute = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        headerBackTitleStyle: { color: `#fff`, fontSize: 20 },
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: `${COLORS.blue[4]}`,
        },
      }}
    >
      {token ? (
        <>
          <Stack.Screen
            name="NAV"
            component={Nav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassScreen"
            component={ChangePassScreen}
            options={{ title: 'Đổi mật khẩu' }}
          />
          <Stack.Screen
            name="MainFriendScreen"
            component={MainFriendScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InformationAccScreen"
            component={InformationAccScreen}
            options={{
              title: 'Thông tin',
            }}
          />
          <Stack.Screen
            name="PublicProfileScreen"
            component={PublicProfileScreen}
            options={{
              title: 'Trang cá nhân',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LOGIN"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="REGISTER"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FORGOT_PASSWORD"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VERIFY_OTP"
            component={VerifyScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Active"
            component={ActiveAccScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default GlobalRoute;
