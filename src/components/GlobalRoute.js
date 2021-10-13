import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ActiveAccScreen from '../screens/ActiveAccScreen.js';
import ChangePassScreen from '../screens/ChangePassScreen.js';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import VerifyScreen from '../screens/VerifyScreen.js';
import Nav from './Nav.js';

const Stack = createStackNavigator();
const GlobalRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
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
        name="ChangePassScreen"
        component={ChangePassScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Active"
        component={ActiveAccScreen}
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
