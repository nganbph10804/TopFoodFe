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
  top: 40%;
`;

const VerifyScreen = ({ navigation }) => {
  const [otp, setOtp] = useState();
  const registerHandler = () => {
    navigation.goBack();
  };

  return (
    <View>
      <ImageBackground
        resizeMode="stretch"
        source={image}
        style={{ width: '100%', height: '100%' }}
      >
        <Page>
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
                onPress={() => registerHandler()}
              >
                Gửi Mã Xác Nhận
              </Text>
            </BtnLogin>
          </View>
        </Page>
      </ImageBackground>
    </View>
  );
};

export default VerifyScreen;
