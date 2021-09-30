import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { index as Main } from './src/pages/Main/index';
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './src/components/Drawer';
import Login  from './src/pages/Login/index'
const App = () => {
  return (
    // <PaperProvider>
    //   <NavigationContainer>
    //     <RootNavigator/>
    //   </NavigationContainer>
    // </PaperProvider>
   <Login/>
  );
};

export default App;
