import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import FeedList from '../../../components/store/feed/FeedList.js';

const FeedListScreen = ({ navigation }) => {
  const { feed } = useSelector(state => state.feed);
  return (
    <View>
      <ScrollView>
        <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
          <Button
            mode="contained"
            icon={() => (
              <MaterialIcons name="post-add" size={24} color="white" />
            )}
            onPress={() => navigation.navigate('CreateFeedScreen')}
          >
            Tạo bài viết
          </Button>
        </View>
        <View>
          {feed.map((i, index) => (
            <FeedList key={index} feed={i} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
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
