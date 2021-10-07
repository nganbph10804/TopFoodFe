import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';
import { getOtpAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/otp.png',
};

const Page = styled(View)`
  top: 45%;
`;

const VerifyScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const registerHandler = () => {
    navigation.navigate('FORGOT_PASSWORD', { email });
    dispatch(getOtpAction(email));
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
              placeholder="Email"
              value={email}
              onChangeText={email => setEmail(email)}
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
