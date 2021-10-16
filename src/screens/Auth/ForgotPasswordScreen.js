import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { forgotAction } from '../../redux/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState('');
  const forgotHandler = () => {
    if (
      otp.trim().length === 0 ||
      password.trim().length === 0 ||
      newPass.trim().length === 0
    ) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else if (password.trim() !== newPass.trim()) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Mật khẩu không giống nhau.',
      });
    } else {
      dispatch(forgotAction(email, password, otp, navigation));
    }
  };

  let [fontsLoaded] = useFonts({
    'Courgette-Regular': require('../../../assets/fonts/Courgette-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ADD8E6',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.card}>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  fontFamily: 'Courgette-Regular',
                  fontSize: 27,
                  color: '#fff',
                  paddingLeft: 50,
                  color: '#000',
                }}
              >
                Quên mật khẩu
              </Text>
            </View>
            <View style={{ position: 'relative', paddingTop: 10 }}>
              <InputUpdate
                mode="outlined"
                label="Mật khẩu mới"
                secureTextEntry={hidden ? false : true}
                value={password}
                onChangeText={password => setPassword(password)}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => setHidden(!hidden)}
                  />
                }
              />
            </View>
            <View style={{ position: 'relative', paddingTop: 20 }}>
              <InputUpdate
                mode="outlined"
                label="Nhập lại mật khẩu"
                secureTextEntry={show ? false : true}
                value={newPass}
                onChangeText={newPass => setNewPass(newPass)}
                right={
                  <TextInput.Icon name="eye" onPress={() => setShow(!show)} />
                }
              />
            </View>
            <View style={{ position: 'relative', paddingTop: 20 }}>
              <InputUpdate
                mode="outlined"
                label="Otp"
                value={otp}
                keyboardType="numeric"
                onChangeText={otp => setOtp(otp)}
              />
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Button
                mode="contained"
                color="#3c6dcc"
                onPress={() => forgotHandler()}
              >
                Đổi Mật Khẩu
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default ForgotPasswordScreen;
