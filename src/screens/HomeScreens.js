import React from 'react';
import ProfileScreen from './ProfileScreen';
import NotificationsScreen from './NotificationsScreen';

const HomeScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="notification" component={NotificationsScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreens;
