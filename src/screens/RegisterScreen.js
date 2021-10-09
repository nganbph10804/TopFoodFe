import { useFonts } from '@expo-google-fonts/inter';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  Text,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BtnDate, BtnLogin, InputAuth, ViewDate } from '../components/index.js';
import { registerAction } from '../redux/actions/authAction.js';
import { MaterialIcons } from '@expo/vector-icons';

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
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let fDate =
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear();
    setText(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const registerHandler = () => {
    setVisible(false);
    dispatch(registerAction(date, email, name, password, phone, username));
    navigation.goBack();
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
                  Hello..
                </Text>
              </View>
              <View>
                <InputAuth
                  placeholder="Họ Tên"
                  value={name}
                  onChangeText={name => setName(name)}
                />
              </View>
              <View>
                <InputAuth
                  placeholder="Email"
                  value={email}
                  onChangeText={email => setEmail(email)}
                />
              </View>
              <View>
                <InputAuth
                  placeholder="Số Điện Thoại"
                  keyboardType="number-pad"
                  value={phone}
                  onChangeText={phone => setPhone(phone)}
                />
              </View>
              <View>
                <InputAuth
                  placeholder="Username"
                  value={username}
                  onChangeText={username => setUsername(username)}
                />
              </View>
              <View style={{ position: 'relative' }}>
                <InputAuth
                  placeholder="Password"
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
              <View style={{ marginBottom: 30 }}>
                <View
                  style={{
                    position: 'relative',
                  }}
                >
                  <BtnDate onPress={showDatepicker}>
                    <MaterialIcons name="date-range" size={28} color="white" />
                  </BtnDate>
                  <ViewDate>{text} </ViewDate>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              <View>
                <BtnLogin>
                  <Text
                    style={{ color: '#fff', fontSize: 22 }}
                    onPress={() => showDialog()}
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
            </KeyboardAvoidingView>
          </Page>

          <Provider>
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={registerHandler}>
                  <Dialog.Title>Thông Báo</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      Đăng ký tài khoản thành công. Mời đăng nhập.
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
  }
};

export default RegisterScreen;
