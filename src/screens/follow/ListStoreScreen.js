import React, { useEffect,  useState } from 'react';
import { View, Text } from 'react-native';
import { Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListStore from '../../components/follow/ListStore.js';
import { storeFollowAction } from '../../redux/follow/followAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

const ListStoreScreen = ({ navigation }) => {
  const storeFollow = useSelector(state => state.follow.storeFollow);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(storeFollowAction());
    });
    return focus;
  }, [dispatch]);
  return (
    <View style={styles.background}>
      <HeaderUser />
      <View style={styles.currentBackground}>
        <Title style={styles.title}>Danh sách cửa hàng đang theo dõi</Title>
        {storeFollow.map((i, index) => (
          <ListStore key={index} store={i} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};

export default ListStoreScreen;
