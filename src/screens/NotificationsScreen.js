import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, Badge, Button, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListRequest from '../components/Friend/ListRequest.js';
import Notification from '../components/Notification.js';
import { COLORS } from '../constants/color.const.js';
import { notificationAction } from '../redux/actions/friendAction.js';
import { styles } from '../styles/paper.js';

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const request = useSelector(state => state.friend.request);
  const loading = useSelector(state => state.friend.loading);

  useFocusEffect(
    useCallback(() => {
      dispatch(notificationAction(0));
    }, [dispatch])
  );
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
        <View style={{ flex: 1 }}>
          <View>
            {request.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <MaterialIcons name="people-alt" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 5,
                    fontWeight: 'bold',
                  }}
                >
                  Lời mời kết bạn
                </Text>
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
          <View
            style={{
              backgroundColor: '#fff',
              paddingTop: 10,
              paddingBottom: 10,
              marginVertical: 10,
              width: '100%',
            }}
          >
            <Title
              style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 20 }}
            >
              Trước đó
            </Title>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <View>
              <Notification />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default NotificationsScreen;
