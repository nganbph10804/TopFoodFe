import React from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-dom';

const ProfileScreen = () => {
  const history = useHistory();
  return (
    <View>
      <Text>profile</Text>
      <Text onPress={() => history.push('/friend-list')}>Friend lists</Text>
    </View>
  );
};

export default ProfileScreen;
