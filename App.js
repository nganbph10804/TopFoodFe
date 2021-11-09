import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import GlobalRoute from './src/navigation/GlobalRoute.js';
import store from './src/redux/store';
import { ToastConfig } from './src/shared/ToastConfig.js';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <GlobalRoute />
          <ToastConfig />
          {/* <StatusBar backgroundColor={`${COLORS.blue[4]}`} /> */}
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
export default App;
