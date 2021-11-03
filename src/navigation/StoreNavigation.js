import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateFoodScreen from '../screens/Store/Food/CreateFoodScreen.js';
import FoodMain from '../screens/Store/Food/FoodMain.js';

const Stack = createStackNavigator();

const StoreNavigation = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen
        name="FoodMain"
        component={FoodMain}
        options={{
          title: 'Home',
          headerBackAllowFontScaling: true,
        }}
      />
      <Stack.Screen
        name="CreateFoodScreen"
        component={CreateFoodScreen}
        options={{
          title: 'Tạo món ăn',
        }}
      />
    </Stack.Navigator>
  );
};

export default StoreNavigation;
