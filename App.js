import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import GlobalRoute from './src/components/GlobalRoute.js';
import store from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GlobalRoute />
        <StatusBar barStyle="default" />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
