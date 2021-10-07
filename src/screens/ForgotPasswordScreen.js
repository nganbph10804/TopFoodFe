import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';
import { useDispatch } from 'react-redux';
import { forgotAction } from '../redux/actions/authAction';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/forgot.png',
};

const Page = styled(View)`
  top: 38%;
`;

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const forgotHandler = () => {
    navigation.navigate('LOGIN');
    console.log(email, password, otp);
    dispatch(forgotAction(email, password, otp));
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
            <CustomInput
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
            <CustomInput
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
            <CustomInput
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
