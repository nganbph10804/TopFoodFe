import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { storeFeedListAction } from '../../redux/feed/feedAction';
import FeedList from '../store/feed/FeedList';

const PostClient = ({ storeId, navigation }) => {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.feed);
  useEffect(() => {
    dispatch(storeFeedListAction(storeId));
  }, [dispatch]);
  return (
    <ScrollView>
      <View>
        {feed.length > 0 ? (
          feed.map((i, index) => (
            <FeedList key={index} feed={i} navigation={navigation} />
          ))
        ) : (
          <Subheading
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: '50%',
              fontSize: 22,
            }}
          >
            Không có bài viết
          </Subheading>
        )}
      </View>
    </ScrollView>
  );
};

export default PostClient;
