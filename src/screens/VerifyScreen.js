import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, InputAuth } from '../components/index.js';
import { getOtpAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/otp.png',
};

const Page = styled(View)`
  top: 45%;
`;

const VerifyScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const verifyHandler = () => {
    if (email.length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống email.',
      });
    } else {
      dispatch(getOtpAction(email));
      navigation.navigate('FORGOT_PASSWORD', { email });
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
          <View>
            <InputAuth
              placeholder="Email"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View>
            <BtnLogin>
              <Text
                style={{ color: '#fff', fontSize: 22 }}
                onPress={() => verifyHandler()}
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
