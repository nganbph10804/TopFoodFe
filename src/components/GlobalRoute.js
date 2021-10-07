import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen.js';
import Nav from './Nav.js';
import VerifyScreen from '../screens/VerifyScreen.js';
4;

const Stack = createStackNavigator();
const GlobalRoute = () => {
  return (
    <Stack.Navigator>
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
        name="NAV"
        component={Nav}
      />
    </Stack.Navigator>
  );
};

export default GlobalRoute;
