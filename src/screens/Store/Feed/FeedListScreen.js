import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FeedList from '../../../components/store/feed/FeedList.js';
import { storeFeedListAction } from '../../../redux/feed/feedAction.js';

const FeedListScreen = ({ navigation }) => {
  const { feed } = useSelector(state => state.feed);
  const role = useSelector(state => state.auth.account.role);
  const account = useSelector(state => state.auth.account);
  const dispatch = useDispatch();
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(storeFeedListAction(account.id));
    });
    return focus;
  }, [dispatch]);
  return (
    <View>
      <ScrollView>
        {role === 'ROLE_STORE' && (
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
        )}
        <View>
          {feed.length > 1 ? (
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
