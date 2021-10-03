import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import Nav from './src/components/Nav.js';
import PrivateRoute from './src/components/PrivateRoute.js';
import store from './src/redux/store';
import HomeScreens from './src/screens/HomeScreens.js';
import LoginScreen from './src/screens/LoginScreen.js';
import NotificationsScreen from './src/screens/NotificationsScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import RegisterScreen from './src/screens/RegisterScreen.js';

function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View>
          <Nav />
          <Route path="/" component={HomeScreens} exact />
          <PrivateRoute path="/profile" component={ProfileScreen} exact />
          <Route path="/notification" component={NotificationsScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <StatusBar />
        </View>
      </NativeRouter>
    </Provider>
  );
}
export default App;
