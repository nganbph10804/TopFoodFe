import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

export const InputAuth = styled(TextInput)`
  width: 80%;
  padding: 10px 15px;
  border-radius: 30px;
  align-self: center;
  background-color: #4c59a5;
  color: #fff;
  font-size: 18px;
  margin-bottom: 30px;
`;
export const CustomInput = styled(TextInput)`
  width: 80%;
  padding: 10px 15px;
  border-radius: 10px;
  align-self: center;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  margin-bottom: 30px;
  border: none;
`;

export const BtnLogin = styled(TouchableOpacity)`
  background-color: #f95f3b;
  align-self: center;
  padding: 10px 30px;
  border-radius: 30px;
  font-size: 18px;
`;
export const BtnDate = styled(TouchableOpacity)`
  align-self: center;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  position: absolute;
  z-index: 999;
  left: 11%;
  top: 12%;
`;

export const ViewDate = styled(Text)`
  font-size: 18px;
  color: #fff;
  background-color: #4c59a5;
  padding-top:12px;
  padding-bottom: 12px
  border-radius: 30px;
  width: 80%;
  align-self: center;
  padding-left: 17%;
`;
export const ViewDateUser = styled(Text)`
  font-size: 18px;
  color: #000;
  background-color: #fff;
  padding-top:12px;
  padding-bottom: 12px
  border-radius: 30px;
  width: 80%;
  align-self: center;
  padding-left: 13%;
`;

export const Main = styled(View)`
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AvatarImage = styled(Image)`
  border: 2px solid white;
`;

export default styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
