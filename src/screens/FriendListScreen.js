import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const FriendListScreen = ({ navigation }) => {
  const friend = useSelector(state => state.friend);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View>
      <Text>ds</Text>
    </View>
  );
};

export default FriendListScreen;
