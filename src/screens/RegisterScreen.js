import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';
import { registerAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/img-register-new.png',
};

const Page = styled(View)`
  top: 7%;
`;

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const registerHandler = () => {
    if (password === confirm) {
      dispatch(registerAction(email, name, password, phone, username));
      navigation.goBack();
    }
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
          resizeMode="stretch"
          source={image}
          style={{ width: '100%', height: '100%' }}
        >
          <Page>
            <View>
              <Text
                style={{
                  fontFamily: 'Courgette-Regular',
                  fontSize: 27,
                  color: '#fff',
                  paddingLeft: 50,
                  marginBottom: 20,
                }}
              >
                Hello..
              </Text>
            </View>
            <View>
              <CustomInput
                placeholder="Họ Tên"
                value={name}
                onChangeText={name => setName(name)}
              />
            </View>
            <View>
              <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={email => setEmail(email)}
              />
            </View>
            <View>
              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={username => setUsername(username)}
              />
            </View>
            <View>
              <CustomInput
                placeholder="Số Điện Thoại"
                keyboardType="number-pad"
                value={phone}
                onChangeText={phone => setPhone(phone)}
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
              <BtnLogin>
                <Text
                  style={{ color: '#fff', fontSize: 22 }}
                  onPress={() => registerHandler()}
                >
                  Đăng Ký
                </Text>
              </BtnLogin>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
              <Text
                style={{ color: '#fff', fontSize: 17 }}
                onPress={() => navigation.goBack()}
              >
                Đã có tài khoản?
              </Text>
            </View>
          </Page>
        </ImageBackground>
      </View>
    );
  }
};

export default RegisterScreen;
