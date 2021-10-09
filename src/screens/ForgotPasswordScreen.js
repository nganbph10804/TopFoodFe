import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import { BtnLogin, CustomInput } from '../components/index.js';
import { useDispatch } from 'react-redux';
import { forgotAction } from '../redux/actions/authAction';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';

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
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const dispatch = useDispatch();
  const forgotHandler = () => {
    setVisible(false);
    navigation.navigate('LOGIN');
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
                onPress={() => showDialog()}
              >
                Đổi Mật Khẩu
              </Text>
            </BtnLogin>
          </View>
        </Page>
        <Provider>
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={forgotHandler}>
                <Dialog.Title>Thông Báo</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>
                    Đổi mật khẩi thành công. Vui lòng đăng nhập lại.
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={forgotHandler}>Đóng</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </Provider>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordScreen;
