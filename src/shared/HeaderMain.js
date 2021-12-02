import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { COLORS } from '../constants/color.const.js';

const HeaderMain = ({ image, name, phone }) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.main}>
        <Avatar.Image
          size={100}
          source={{
            uri:
              image === null ? 'https://fakeimg.pl/350x200/?text=Hello' : image,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: `${COLORS.blue[4]}`,
    height: 150,
  },
  image: {
    marginLeft: 30,
    marginRight: 10,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  phone: {
    fontSize: 18,
    color: '#fff',
    paddingLeft: 5,
  },
});
export default HeaderMain;
