import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListStore from '../../components/follow/ListStore.js';
import { listStoreFollowAction } from '../../redux/follow/followAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

const ListStoreScreen = ({ navigation }) => {
  const followListStore = useSelector(state => state.follow.followListStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStoreFollowAction());
  }, [dispatch]);
  return (
    <View style={styles.background}>
      <HeaderUser />
      <View style={styles.currentBackground}>
        {followListStore.length > 0 && (
          <Title style={styles.title}>Danh sách cửa hàng đang theo dõi</Title>
        )}
        {followListStore.length > 0 ? (
          followListStore.map((i, index) => (
            <ListStore key={index} store={i} navigation={navigation} />
          ))
        ) : (
          <View style={{ alignItems: 'center', margin: 40 }}>
            <Subheading style={{ fontWeight: 'bold', fontSize: 20 }}>
              Không có cửa hàng đang follow
            </Subheading>
          </View>
        )}
      </View>
    </View>
  );
};

export default ListStoreScreen;
