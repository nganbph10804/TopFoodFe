import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FriendList from '../../components/Friend/FriendList.js';
import { COLORS } from '../../constants/color.const.js';
import { friendListAction } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const FriendListScreen = ({ navigation }) => {
  const { friend } = useSelector(state => state.friend);
  const loading = useSelector(state => state.friend.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(friendListAction(page));
    });
    return focus;
  }, [dispatch, page, navigation]);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      ) : (
        <View style={styles.main}>
          {friend.length === 0 ? (
            <View style={styles.noFriend}>
              <Text style={styles.textXL}>Không có bạn bè</Text>
            </View>
          ) : (
            <View>
              {friend.map((item, index) => (
                <FriendList key={index} item={item} navigation={navigation} />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FriendListScreen;
