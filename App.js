import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import GlobalRoute from './src/navigation/GlobalRoute.js';
import store from './src/redux/store';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <GlobalRoute />
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
export default App;
