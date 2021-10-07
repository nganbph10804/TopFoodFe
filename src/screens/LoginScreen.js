import { useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';
import { loginAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/img-login.png',
};

const Page = styled(View)`
  position: absolute;
  width: 100%;
  top: 37%;
`;

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handlerLogin = () => {
    dispatch(loginAction(username, password));
    navigation.navigate('NAV');
  };
  let [fontsLoaded] = useFonts({
    'Courgette-Regular': require('../../assets/fonts/Courgette-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <ImageBackground
          resizeMode="cover"
          source={image}
          style={{ width: '100%', height: '100%' }}
        >
          <Page>
            <View style={{ marginBottom: 10, marginLeft: 33 }}>
              <Text
                style={{
                  fontFamily: 'Courgette-Regular',
                  color: '#fff',
                  fontSize: 35,
                  textAlign: 'left',
                }}
              >
                {' '}
                Welcome{'\n'} Back
              </Text>
            </View>
            <View>
              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={username => setUsername(username)}
              />
            </View>
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
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  paddingRight: 50,
                  color: '#fff',
                  marginBottom: 30,
                  fontSize: 17,
                }}
                onPress={() => navigation.navigate('VERIFY_OTP')}
              >
                Quên mật khẩu?
              </Text>
            </View>
            <View>
              <BtnLogin>
                <Text
                  style={{ color: '#fff', fontSize: 22 }}
                  onPress={() => handlerLogin()}
                >
                  Đăng Nhập
                </Text>
              </BtnLogin>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 30 }}>
              <Text
                style={{ color: '#fff', fontSize: 17 }}
                onPress={() => navigation.navigate('REGISTER')}
              >
                Tạo tài khoản mới?
              </Text>
            </View>
          </Page>
        </ImageBackground>
      </View>
    );
  }
};

export default LoginScreen;
