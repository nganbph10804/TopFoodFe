import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
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
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const dispatch = useDispatch();
  const registerHandler = () => {
    dispatch(getOtpAction(email));
    setVisible(false);
    navigation.navigate('FORGOT_PASSWORD', { email });
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
                onPress={() => showDialog()}
              >
                Gửi Mã Xác Nhận
              </Text>
            </BtnLogin>
          </View>
        </Page>
        <Provider>
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={registerHandler}>
                <Dialog.Title>Thông Báo</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>
                    Gửi mã xác nhận thành công. Vui lòng kiểm tra email!
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={registerHandler}>Đóng</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </Provider>
      </ImageBackground>
    </View>
  );
};

export default VerifyScreen;
