import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import { BtnLogin, InputAuth } from '../components/index.js';
import { useDispatch } from 'react-redux';
import { forgotAction } from '../redux/actions/authAction';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/forgot.png',
};

const Page = styled(View)`
  top: 38%;
`;

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const forgotHandler = () => {
    if (otp.length === 0 || password.length === 0 || confirm.length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else if (password !== confirm) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Mật khẩu không giống nhau.',
      });
    } else {
      dispatch(forgotAction(email, password, otp, navigation));
    }
  };

  return (
    <View>
      <ImageBackground
        resizeMode="stretch"
        source={image}
        style={{ width: '100%', height: '100%' }}
      >
        <Page>
          <View style={{ position: 'relative' }}>
            <InputAuth
              placeholder="Password"
              secureTextEntry={show ? false : true}
              value={password}
              onChangeText={password => setPassword(password)}
            />
            <Icon
              name={show ? 'eye' : 'eye-slash'}
              size={20}
              color="white"
              onPress={() => setShow(!show)}
              style={{ position: 'absolute', right: 63, top: 15 }}
            />
          </View>
          <View style={{ position: 'relative' }}>
            <InputAuth
              placeholder="Nhập lại Password"
              secureTextEntry={hidden ? false : true}
              value={confirm}
              onChangeText={confirm => setConfirm(confirm)}
            />
            <Icon
              name={hidden ? 'eye' : 'eye-slash'}
              size={20}
              color="white"
              onPress={() => setHidden(!hidden)}
              style={{ position: 'absolute', right: 63, top: 15 }}
            />
          </View>
          <View>
            <InputAuth
              placeholder="Otp"
              value={otp}
              onChangeText={otp => setOtp(otp)}
            />
          </View>
          <View>
            <BtnLogin>
              <Text
                style={{ color: '#fff', fontSize: 22 }}
                onPress={() => forgotHandler()}
              >
                Đổi Mật Khẩu
              </Text>
            </BtnLogin>
          </View>
        </Page>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordScreen;
