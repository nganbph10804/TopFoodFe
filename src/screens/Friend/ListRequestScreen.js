import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Badge, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListRequest from '../../components/Friend/ListRequest.js';
import { listRequestAction } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const ListRequestScreen = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const request = useSelector(state => state.friend.request);
  useEffect(() => {
    dispatch(listRequestAction(page, 10));
  }, [dispatch, page]);

  return (
    <View style={styles.main}>
      {request.length === 0 ? (
        <View style={styles.noFriend}>
          <Title style={styles.textXL}>Không có yêu cầu</Title>
        </View>
      ) : (
        <View>
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
              style={{ fontSize: 20, paddingHorizontal: 5, fontWeight: 'bold' }}
            >
              Lời mời kết bạn
            </Text>
            <Badge size={30}>{request.length}</Badge>
          </View>
          <View>
            {request.map((friend, key) => (
              <ListRequest key={key} friend={friend} navigation={navigation} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ListRequestScreen;
