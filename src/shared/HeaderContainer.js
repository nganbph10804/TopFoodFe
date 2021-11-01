import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';

const HeaderContainer = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={{ height: 40 }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
export default HeaderContainer;
