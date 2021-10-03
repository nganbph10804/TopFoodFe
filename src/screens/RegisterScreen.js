import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/new-register.png',
};

const Page = styled.View`
  position: absolute;
  width: 100%;
  top: 50%;
`;

const RegisterScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <ImageBackground source={image} style={{ width: '100%', height: '100%' }}>
        <Page>
          <View>
            <CustomInput placeholder="Username" />
          </View>
          <View style={{ position: 'relative' }}>
            <CustomInput
              placeholder="Password"
              secureTextEntry={show ? false : true}
            />
            <Icon
              name={show ? 'eye' : 'eye-slash'}
              size={20}
              color="white"
              onPress={() => setShow(!show)}
              style={{ position: 'absolute', right: 63, top: 20 }}
            />
          </View>
          <View>
            <BtnLogin>
              <Text
                style={{ color: '#fff', fontSize: 22 }}
                onPress={() => navigation.goBack()}
              >
                Đăng Ký
              </Text>
            </BtnLogin>
          </View>
          <View style={{ alignSelf: 'center', marginTop: 30 }}>
            <Text style={{ color: '#fff', fontSize: 17 }}>
              Đã có tài khoản?
            </Text>
          </View>
        </Page>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
