import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../components/store/ListButton.js';
import { storeFeedListAction } from '../../../redux/feed/feedAction.js';
import { clearFilesAction } from '../../../redux/file/actions/fileAction.js';
import { userFollowAction } from '../../../redux/follow/followAction.js';
import { hotListAction } from '../../../redux/foodHot/foodHotActions.js';
import { foodListAction } from '../../../redux/store/food/actions/foodAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';

const FoodMain = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const account = useSelector(state => state.auth.account);
  const role = useSelector(state => state.auth.account.role);
  const { listUserFollowStore } = useSelector(state => state.follow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchTagAction());
    dispatch(storeFeedListAction(profile.id));
    dispatch(clearFilesAction());
    dispatch(userFollowAction());
    dispatch(foodListAction(account.id));
    dispatch(hotListAction(account.id));
  }, [dispatch]);
  return (
    <View style={styles.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
      <View style={{ marginTop: 30 }}>
        {listUserFollowStore.length > 0 && (
          <View style={styled.item}>
            <FontAwesome name="users" size={24} color="black" />
            <Subheading style={styled.text}>
              {listUserFollowStore.length} Người dùng theo dõi
            </Subheading>
          </View>
        )}
        <View style={styled.item}>
          <Feather name="phone-call" size={24} color="black" />
          <Subheading style={styled.text}>{account.phoneNumber}</Subheading>
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 30,
  },
  text: {
    marginHorizontal: 10,
  },
});
export default FoodMain;
