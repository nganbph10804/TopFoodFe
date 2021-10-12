import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, InputAuth } from '../components/index.js';
import { activeAccAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/active.png',
};

const Page = styled(View)`
  top: 45%;
`;

const ChangePassScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const handlerActive = () => {
    if (otp.length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(activeAccAction(otp, navigation));
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
          resizeMode="cover"
          source={image}
          style={{ width: '100%', height: '100%' }}
        >
          <Page>
            <KeyboardAvoidingView>
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
                  Kích hoạt tài khoản.
                </Text>
              </View>
              <View>
                <InputAuth
                  placeholder="OTP"
                  onChangeText={otp => setOtp(otp)}
                />
              </View>
              <BtnLogin>
                <Text
                  style={{ color: '#fff', fontSize: 22 }}
                  onPress={() => handlerActive()}
                >
                  Kích hoạt tài khoản
                </Text>
              </BtnLogin>
            </KeyboardAvoidingView>
          </Page>
        </ImageBackground>
      </View>
    );
  }
};

export default ChangePassScreen;
