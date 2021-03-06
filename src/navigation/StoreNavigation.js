import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { COLORS } from '../constants/color.const.js';
import CreateFeedScreen from '../screens/Store/Feed/CreateFeedScreen.js';
import EditFeedScreen from '../screens/Store/Feed/EditFeedScreen.js';
import FeedListScreen from '../screens/Store/Feed/FeedListScreen.js';
import CreateFoodScreen from '../screens/Store/Food/CreateFoodScreen.js';
import EditFoodScreen from '../screens/Store/Food/EditFoodScreen.js';
import FoodDetailScreen from '../screens/Store/Food/FoodDetailScreen.js';
import FoodListScreen from '../screens/Store/Food/FoodListScreen.js';
import FoodMain from '../screens/Store/Food/FoodMain.js';
import SubFoodScreen from '../screens/Store/Food/SubFoodScreen.js';

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
        }}
      />
      <Stack.Screen
        name="FeedListScreen"
        component={FeedListScreen}
        options={{
          title: 'Bài viết',
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
          title: 'Chỉnh sửa',
        }}
      />
      <Stack.Screen
        name="CreateFeedScreen"
        component={CreateFeedScreen}
        options={{
          title: 'Tạo bài viết',
        }}
      />
      <Stack.Screen
        name="EditFeedScreen"
        component={EditFeedScreen}
        options={{
          title: 'Chỉnh sửa',
        }}
      />
      <Stack.Screen
        name="SubFoodScreen"
        component={SubFoodScreen}
        options={{
          title: 'Chi tiết món ăn',
        }}
      />
    </Stack.Navigator>
  );
};

export default StoreNavigation;
