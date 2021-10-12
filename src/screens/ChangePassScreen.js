import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnLogin, InputAuth } from '../components/index.js';
import { changePassAction } from '../redux/actions/authAction.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/img-register-new.png',
};

const Page = styled(View)`
  top: 30%;
`;

const ChangePassScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);

  const changePassHandler = () => {
    if (password.length === 0 || newPass.length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(changePassAction(newPass, password, navigation));
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
                  Đổi mật khẩu.
                </Text>
              </View>
              <View style={{ position: 'relative' }}>
                <InputAuth
                  placeholder="Mật khẩu cũ"
                  secureTextEntry={hidden ? false : true}
                  value={password}
                  onChangeText={password => setPassword(password)}
                />
                <Icon
                  name={hidden ? 'eye' : 'eye-slash'}
                  size={20}
                  color="white"
                  onPress={() => setHidden(!hidden)}
                  style={{ position: 'absolute', right: 63, top: 15 }}
                />
              </View>
              <View style={{ position: 'relative' }}>
                <InputAuth
                  placeholder="Mật khẩu mới"
                  secureTextEntry={show ? false : true}
                  value={newPass}
                  onChangeText={newPass => setNewPass(newPass)}
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
                <BtnLogin>
                  <Text
                    style={{ color: '#fff', fontSize: 22 }}
                    onPress={() => changePassHandler()}
                  >
                    Đổi mật khẩu
                  </Text>
                </BtnLogin>
              </View>
            </KeyboardAvoidingView>
          </Page>
        </ImageBackground>
      </View>
    );
  }
};

export default ChangePassScreen;
