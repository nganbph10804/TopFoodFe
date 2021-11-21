import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../components/store/ListButton.js';
import { clearFilesAction } from '../../../redux/file/actions/fileAction.js';
import { userFollowAction } from '../../../redux/follow/followAction.js';
import { storeFeedListAction } from '../../../redux/store/feed/actions/feedAction.js';
import { foodListAction } from '../../../redux/store/food/actions/foodAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';

const FoodMain = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const account = useSelector(state => state.auth.account);
  console.log(account);
  const role = useSelector(state => state.auth.account.role);
  const { listUserFollowStore } = useSelector(state => state.follow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchTagAction(''));
    dispatch(storeFeedListAction(profile.id));
    dispatch(clearFilesAction());
    dispatch(userFollowAction());
    dispatch(foodListAction());
  }, [dispatch]);
  return (
    <View style={styles.main}>
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
          <Feather name="phone-call" size={24} color="black" />
          <Subheading style={styled.text}>{account.phoneNumber}</Subheading>
        </View>
        <View style={styled.item}>
          <FontAwesome name="address-book" size={24} color="black" />
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
    flexWrap: 'wrap',
    marginVertical: 10,
    marginLeft: 30,
  },
  text: {
    marginHorizontal: 10,
  },
});
export default FoodMain;
