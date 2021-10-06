import React from 'react';
import { View, Text } from 'react-native';

const FriendListScreen = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.goBack()}>friend</Text>
    </View>
  );
};

export default FriendListScreen;
