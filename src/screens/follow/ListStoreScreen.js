import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListStore from '../../components/follow/ListStore.js';
import { listStoreFollowAction } from '../../redux/follow/followAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

const ListStoreScreen = ({ navigation }) => {
  const followListStore = useSelector(state => state.follow.followListStore);
  const dispatch = useDispatch();
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(listStoreFollowAction());
    });
    return focus;
  }, [dispatch]);
  return (
    <View style={styles.background}>
      <HeaderUser />
      <View style={styles.currentBackground}>
        <Title style={styles.title}>Danh sách cửa hàng đang theo dõi</Title>
        {followListStore.map((i, index) => (
          <ListStore key={index} store={i} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

export default ListStoreScreen;
