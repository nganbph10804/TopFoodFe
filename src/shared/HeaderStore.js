import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { COLORS } from '../constants/color.const.js';

const HeaderStore = ({ image, name }) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.main}>
        <Avatar.Image source={{ uri: image }} style={styles.image} size={100} />
        <Title style={styles.text}>{name}</Title>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.blue[4]}`,
    height: 230,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  main: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    paddingTop: 20,
  },
});
export default HeaderStore;
