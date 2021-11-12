import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../constants/color.const.js';
import CreateFoodScreen from '../screens/Store/Food/CreateFoodScreen.js';
import EditFoodScreen from '../screens/Store/Food/EditFoodScreen.js';
import FoodDetailScreen from '../screens/Store/Food/FoodDetailScreen.js';
import FoodListScreen from '../screens/Store/Food/FoodListScreen.js';
import FoodMain from '../screens/Store/Food/FoodMain.js';

const Stack = createStackNavigator();

const StoreNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        headerBackTitleStyle: { color: `#fff`, fontSize: 20 },
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: `${COLORS.blue[4]}`,
        },
      }}
    >
      <Stack.Screen
        name="FoodMain"
        component={FoodMain}
        options={{
          title: 'Cửa hàng',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FoodListScreen"
        component={FoodListScreen}
        options={{
          title: 'Món ăn',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateFoodScreen"
        component={CreateFoodScreen}
        options={{
          title: 'Tạo món ăn',
        }}
      />
      <Stack.Screen
        name="FoodDetailScreen"
        component={FoodDetailScreen}
        options={{
          title: 'Chi tiết món ăn',
        }}
      />
      <Stack.Screen
        name="EditFoodScreen"
        component={EditFoodScreen}
        options={{
          title: 'Cập nhật',
        }}
      />
    </Stack.Navigator>
  );
};

export default StoreNavigation;
