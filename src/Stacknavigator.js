import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomTabs } from './BottomTab';
import MessageScreen from './screens/MessageScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = ({navigation}) => {

  return (
    <Stack.Navigator 
    screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
      />
    </Stack.Navigator>
  );
};
