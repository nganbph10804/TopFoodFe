import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListButton from '../../../components/store/ListButton.js';
import { feedListAction } from '../../../redux/store/feed/actions/feedAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';

const FoodMain = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchTagAction(''));
  }, [dispatch]);
  useEffect(() => {
    dispatch(feedListAction());
  }, [dispatch]);
  return (
    <View style={styles.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
    </View>
  );
};

export default FoodMain;
