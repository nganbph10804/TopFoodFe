import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileStoreAction } from '../../redux/store/profile/profileAction.js';
import HeaderStore from '../../shared/HeaderStore.js';
import { styles } from '../../styles/paper.js';
import ListButton from '../store/ListButton.js';

const StoreClient = ({ route, navigation }) => {
  const { storeId } = route.params;
  const { profile } = useSelector(state => state.storeProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileStoreAction(storeId));
  }, [dispatch, storeId]);
  return (
    <View style={styled.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
      {/* <View style={{ backgroundColor: `${COLORS.white[1]}`, marginTop: 30 }}>
        <View style={styled.item}>
          <FontAwesome name="users" size={24} color="black" />
          <Subheading>
            Đang có {userFollow.length} người dùng theo dõi cửa hàng
          </Subheading>
        </View>
      </View> */}
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
    marginVertical: 10,
    marginLeft: 20,
  },
});
export default StoreClient;
