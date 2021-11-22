import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileStoreAction } from '../../redux/store/profile/profileAction.js';
import HeaderStore from '../../shared/HeaderStore.js';
import ListButton from '../store/ListButton.js';

const StoreClient = ({ route, navigation }) => {
  const { storeId } = route.params;
  const { profile } = useSelector(state => state.storeProfile);
  const { listUserFollowStore } = useSelector(state => state.follow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileStoreAction(storeId));
  }, [dispatch, storeId]);
  return (
    <View style={styled.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
      <View style={{ marginTop: 30 }}>
        <View style={styled.item}>
          <FontAwesome name="users" size={24} color="black" />
          <Subheading style={styled.text}>
            Đang có {listUserFollowStore.length} người dùng theo dõi
          </Subheading>
        </View>
        <View style={styled.item}>
          <Feather name="map-pin" size={24} color="black" />
          <Subheading style={styled.text}>{profile.address}</Subheading>
        </View>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginLeft: 30,
  },
  text: {
    marginHorizontal: 10,
  },
});
export default StoreClient;
