import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/color.const.js';

//2089dc ADD8E6
export const styled = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: `${COLORS.blue[2]}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  image: {
    borderColor: '#ccc',
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  textName: {
    fontSize: 17,
  },
  textTag: {
    fontSize: 13,
    color: '#968299',
    marginTop: 5,
  },
  textPrice: {
    fontSize: 16,
    marginTop: 20,
  },
});
