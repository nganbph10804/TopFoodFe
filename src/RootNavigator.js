import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StackNavigator } from './Stacknavigator.js';
import { DrawerContent } from './DrawerContent';
import MessageScreen from './screens/MessageScreen';
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();
const imageLogo = {
  uri: 'https://lh5.googleusercontent.com/QDCBB_0ZGjhXSRa7odV5z9hpK2nA9IFomi7uoT1XoOBTTx4_LmWC6fNCz6nXoqbBE_XY9snWTr9Q65UDjeFs=w1920-h880'
}
export const RootNavigator = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          title: 'TopFood',
          headerStyle:{
           height: 90,
           backgroundColor:'#283793'
            
          },
          headerTitle: ()=>(
            <Image resizeMode="contain" style={{width:100,height:50}} source={imageLogo}/>
          )
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="TopFood" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={MessageScreen} />
        <Drawer.Screen name="BookMarks" component={MessageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};