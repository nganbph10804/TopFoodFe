import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StackNavigator } from './Stacknavigator.js';
import { DrawerContent } from './DrawerContent';
import MessageScreen from './screens/MessageScreen';

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator  drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="TopFood" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={MessageScreen} />
        <Drawer.Screen name="BookMarks" component={MessageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};