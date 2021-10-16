import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ActiveAccScreen from "../screens/Auth/ActiveAccScreen.js";
import ChangePassScreen from "../screens/Auth/ChangePassScreen.js";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen.js";
import LoginScreen from "../screens/Auth/LoginScreen.js";
import RegisterScreen from "../screens/Auth/RegisterScreen.js";
import VerifyScreen from "../screens/Auth/VerifyScreen.js";
import MainFriendScreen from "../screens/Friend/MainFriendScreen.js";
import InformationAccScreen from "../screens/Profile/InformationAccScreen.js";
import PublicProfileScreen from "../screens/Profile/PublicProfileScreen.js";
import Nav from "./Nav.js";

const Stack = createStackNavigator();
const GlobalRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
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
        name="ChangePassScreen"
        component={ChangePassScreen}
        options={{ title: "Đổi mật khẩu" }}
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
      <Stack.Screen
        name="MainScreen"
        component={MainFriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InformationAccScreen"
        component={InformationAccScreen}
        options={{
          title: "Thông tin tài khoản",
        }}
      />
      <Stack.Screen
        name="PublicProfileScreen"
        component={PublicProfileScreen}
        options={{
          title: "Trang cá nhân",
        }}
      />
    </Stack.Navigator>
  );
};

export default GlobalRoute;
