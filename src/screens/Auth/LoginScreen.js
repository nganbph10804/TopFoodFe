import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, InputAuth } from '../../components/index.js';
import { COLORS } from '../../constants/color.const.js';
import { loginAction } from '../../redux/actions/authAction.js';
import { styles } from '../../styles/paper.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/img-login.png',
};

const Page = styled(View)`
  position: absolute;
  width: 100%;
  top: 37%;
`;

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handlerLogin = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống username và password',
      });
    } else {
      dispatch(loginAction(username, password));
      setUsername('');
      setPassword('');
    }
  };

  let [fontsLoaded] = useFonts({
    'Courgette-Regular': require('../../../assets/fonts/Courgette-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground
          resizeMode="cover"
          source={image}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator
                animating={true}
                color={`${COLORS.blue[1]}`}
                size={'large'}
              />
            </View>
          )}
          <Page>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={100}
              style={{ flex: 1 }}
            >
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
                <InputAuth
                  placeholder="Username"
                  value={username}
                  onChangeText={username => setUsername(username)}
                />
              </View>
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
                <BtnLogin onPress={() => handlerLogin()}>
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
            </KeyboardAvoidingView>
          </Page>
        </ImageBackground>
      </View>
    );
  }
};

export default LoginScreen;
