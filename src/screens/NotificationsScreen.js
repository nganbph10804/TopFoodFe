import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Badge, Button, Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListRequest from '../components/Friend/ListRequest.js';
import Notification from '../components/Notification.js';
import { COLORS } from '../constants/color.const.js';
import { notificationAction } from '../redux/friend/actions/friendAction.js';
import HeaderUser from '../shared/HeaderUser.js';
import { styles } from '../styles/paper.js';

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const request = useSelector(state => state.friend.request);

  useFocusEffect(
    useCallback(() => {
      dispatch(notificationAction(0));
    }, [dispatch])
  );
  return (
    <View style={styles.background}>
      <HeaderUser />
      <Card style={styles.currentBackground}>
        <View style={{ flex: 1 }}>
          <Title style={{ marginTop: 20, marginLeft: 20 }}>Thông báo</Title>
          <Divider />
          <View>
            {request.length > 0 ? (
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Title style={{ marginHorizontal: 10 }}>Lời mời kết bạn</Title>
                <Badge size={30}>{request.length}</Badge>
                <View style={styles.seeAll}>
                  <Button>xem thêm</Button>
                </View>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
          <View>
            {request.map((friend, key) => (
              <ListRequest key={key} friend={friend} navigation={navigation} />
            ))}
          </View>
          {/* <View
            style={{
              width: '100%',
            }}
          >
            <Title style={{ marginLeft: 20 }}>Trước đó</Title>
          </View>
          <View>
            <Notification />
          </View> */}
        </View>
      </Card>
    </View>
  );
};

export default NotificationsScreen;
