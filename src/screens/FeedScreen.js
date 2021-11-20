import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import HomeList from '../components/home/HomeList.js';
import { storeFeedListAction } from '../redux/store/feed/actions/feedAction.js';
import HeaderUser from '../shared/HeaderUser.js';

const FeedScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.feed);
  // useEffect(() => {
  //   dispatch(storeFeedListAction(profile.id));
  // }, [dispatch]);

  return (
    <View>
      <ScrollView>
        <HeaderUser />
        <View>
          {feed.map((i, index) => (
            <HomeList key={index} feed={i} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedScreen;
