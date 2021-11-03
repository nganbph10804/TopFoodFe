import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { COLORS } from '../constants/color.const.js';
export const InputUpdate = styled(TextInput)`
  width: 90%;
  align-self: center;
`;
export const InputLogin = styled(TextInput)`
  width: 90%;
  align-self: center;
`;

//2089dc ADD8E6
export const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '90%',
    zIndex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: 30,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
  },
  loading: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99999,
  },
  search: {
    borderRadius: 10,
    zIndex: 1,
  },
  noFriend: {
    top: '45%',
    alignItems: 'center',
  },
  textXL: {
    fontSize: 28,
  },
  Item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 5,
    marginTop: 10,
    paddingLeft: 15,
  },
  lastItem: {
    right: 20,
    position: 'absolute',
  },
  seeAll: {
    position: 'absolute',
    right: 0,
    top: 8,
  },
  imageContainer: {
    position: 'absolute',
    bottom: '-30%',
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: `${COLORS.blue[1]}`,
  },
  iconAvatar: {
    position: 'absolute',
    bottom: 10,
    right: -18,
    backgroundColor: `${COLORS.purple[4]}`,
    borderRadius: 80,
    alignSelf: 'center',
  },
  iconCover: {
    position: 'absolute',
    bottom: -20,
    right: 38,
    backgroundColor: `${COLORS.purple[4]}`,
    borderRadius: 80,
    alignSelf: 'center',
  },
});
