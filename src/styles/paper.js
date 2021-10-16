import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components';
export const InputUpdate = styled(TextInput)`
  width: 90%;
  align-self: center;
`;

//2089dc ADD8E6
export const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '90%',
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
    zIndex: 999,
  },
});
