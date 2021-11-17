import { Feather, Octicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Subheading, Title } from 'react-native-paper';
import { COLORS } from '../constants/color.const.js';
import HeaderUser from '../shared/HeaderUser.js';
import { styles } from '../styles/paper.js';

const ContactScreen = () => {
  return (
    <View style={styles.background}>
      <HeaderUser />
      <View style={styles.currentBackground}>
        <Title style={styles.title}>Liên hệ</Title>
        <View style={styled.item}>
          <Feather name="phone-call" size={24} color="black" />
          <Subheading style={styled.text}>Hỗ trợ</Subheading>
          <Subheading style={styled.lastItem}>19008090</Subheading>
        </View>
        <Divider />
        <View style={styled.item}>
          <Octicons name="versions" size={24} color="black" />
          <Subheading style={styled.text}>Phiên bản 1.0</Subheading>
        </View>
        <Divider />
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 10,
    marginLeft: 20,
  },
  lastItem: {
    color: `${COLORS.blue[1]}`,
    position: 'absolute',
    right: 10,
  },
  text: {
    marginLeft: 10,
  },
});

export default ContactScreen;
