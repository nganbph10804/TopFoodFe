import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeList from '../components/home/HomeList.js';
import { feedListAction } from '../redux/store/feed/actions/feedAction.js';

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.feed);
  useEffect(() => {
    dispatch(feedListAction());
  }, [dispatch]);

  return (
    <ScrollView>
      <View>
        {feed.map((i, index) => (
          <HomeList key={index} feed={i} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

export default FeedScreen;
