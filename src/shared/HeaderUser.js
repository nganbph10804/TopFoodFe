import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/color.const.js';

const HeaderUser = () => {
  const profile = useSelector(state => state.auth.profile);
  const { avatar, name } = profile;
  return (
    <View>
      <View style={styled.main}>
        <Avatar.Image source={{ uri: avatar }} />
        <Text style={styled.text}>{name} </Text>
        {/* <View style={styled.lastItem}>
          <AntDesign name="search1" size={24} color={`${COLORS.blue[4]}`} />
        </View> */}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.blue[4]}`,
    paddingBottom: 15,
    paddingLeft: '10%',
    height: 100,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
  },
  lastItem: {
    position: 'absolute',
    right: '10%',
    top: '30%',
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 5,
  },
});
export default HeaderUser;
