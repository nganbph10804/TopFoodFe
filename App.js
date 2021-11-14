import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import GlobalRoute from './src/navigation/GlobalRoute.js';
import store from './src/redux/store';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <GlobalRoute />
          <Toast
            ref={ref => Toast.setRef(ref)}
            visibilityTime={1000}
            topOffset={40}
            autoHide={true}
          />
          {/* <StatusBar backgroundColor={`${COLORS.blue[4]}`} /> */}
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
export default App;
