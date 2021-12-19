import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/color.const.js';

//2089dc ADD8E6
export const styled = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: `${COLORS.blue[2]}`,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
    width: 120,
    height: 120,
  },
  textName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  textTag: {
    fontSize: 13,
    color: '#968299',
    marginTop: 5,
  },
  textPrice: {
    fontSize: 17,
    marginTop: 20,
    fontStyle: 'italic',
  },
});
