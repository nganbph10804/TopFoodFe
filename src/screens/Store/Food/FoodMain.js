import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ListButton from '../../../components/store/ListButton.js';
import HeaderStore from '../../../shared/HeaderStore.js';
import { styles } from '../../../styles/paper.js';

const FoodMain = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  return (
    <View style={styles.main}>
      <HeaderStore image={profile.avatar} name={profile.name} />
      <ListButton navigation={navigation} />
    </View>
  );
};

export default FoodMain;
