import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreens from './src/screens/HomeScreens.js';
import LoginScreen from './src/screens/LoginScreen.js';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen.js';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreens} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
