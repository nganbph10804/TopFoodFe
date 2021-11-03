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
    padding: 10,
    alignSelf: 'center',
  },
});
