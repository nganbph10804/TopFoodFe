import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreClient from '../components/client/StoreClient.js';
import { COLORS } from '../constants/color.const.js';
import { favoriteListAction } from '../redux/favorite/favoriteAction.js';
import ActiveAccScreen from '../screens/Auth/ActiveAccScreen.js';
import ChangePassScreen from '../screens/Auth/ChangePassScreen.js';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen.js';
import LoginScreen from '../screens/Auth/LoginScreen.js';
import RegisterScreen from '../screens/Auth/RegisterScreen.js';
import VerifyScreen from '../screens/Auth/VerifyScreen.js';
import ContactScreen from '../screens/ContactScreen.js';
import EditFavoriteScreen from '../screens/favorite/EditFavoriteScreen.js';
import FavoriteScreen from '../screens/favorite/FavoriteScreen.js';
import ListStoreScreen from '../screens/follow/ListStoreScreen.js';
import MainFriendScreen from '../screens/Friend/MainFriendScreen.js';
import InformationAccScreen from '../screens/Profile/InformationAccScreen.js';
import PublicProfileScreen from '../screens/Profile/PublicProfileScreen.js';
import Nav from './Nav.js';

const Stack = createStackNavigator();
const GlobalRoute = () => {
  const token = useSelector(state => state.auth.token);
  const { status } = useSelector(state => state.auth.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(favoriteListAction());
  }, [dispatch]);
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
      {token && status === 'WAIT_ACTIVE' ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Active"
          component={ActiveAccScreen}
        />
      ) : null}
      {token ? (
        <>
          <Stack.Screen
            name="NAV"
            component={Nav}
            options={{ headerShown: false, title: 'Back' }}
          />
          <Stack.Screen
            name="ChangePassScreen"
            component={ChangePassScreen}
            options={{ title: 'Đổi mật khẩu', headerShown: false }}
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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PublicProfileScreen"
            component={PublicProfileScreen}
            options={{
              title: 'Trang cá nhân',
            }}
          />
          <Stack.Screen
            name="ContactScreen"
            component={ContactScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListStoreScreen"
            component={ListStoreScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StoreClient"
            component={StoreClient}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FavoriteScreen"
            component={FavoriteScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditFavoriteScreen"
            component={EditFavoriteScreen}
            options={{
              headerShown: false,
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default GlobalRoute;
