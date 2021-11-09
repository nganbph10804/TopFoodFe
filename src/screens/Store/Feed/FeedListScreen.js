import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const FeedListScreen = ({ navigation }) => {
  return (
    <View>
      <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
        <Button
          mode="contained"
          icon={() => <MaterialIcons name="post-add" size={24} color="white" />}
          onPress={() => navigation.navigate('CreateFeedScreen')}
        >
          Tạo bài viết
        </Button>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  icon: {
    backgroundColor: `#fff`,
    padding: 5,
    borderRadius: 10,
  },
});

export default FeedListScreen;
