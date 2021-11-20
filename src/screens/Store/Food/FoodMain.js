import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../components/store/ListButton.js';
import { clearFilesAction } from '../../../redux/file/actions/fileAction.js';
import { userFollowAction } from '../../../redux/follow/followAction.js';
import { storeFeedListAction } from '../../../redux/store/feed/actions/feedAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../../constants/color.const.js';
import { foodListAction } from '../../../redux/store/food/actions/foodAction.js';

const FoodMain = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const { userFollow } = useSelector(state => state.follow);
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
            Đang có {userFollow.length} người dùng theo dõi
          </Subheading>
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
