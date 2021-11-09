import { useFonts } from '@expo-google-fonts/inter';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  Dialog,
  Portal,
  TextInput,
  Button,
  Provider,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  BtnDate,
  BtnLogin,
  InputAuth,
  ViewDate,
} from '../../components/index.js';
import PopupOtp from '../../components/PopupOtp.js';
import { registerAction } from '../../redux/actions/authAction.js';
import { InputUpdate } from '../../styles/paper.js';

const image = {
  uri: 'https://raw.githubusercontent.com/Leomin07/img/master/img-register-new.png',
};

const Page = styled(View)`
  top: 7%;
`;

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [showDialog, setShowDialog] = useState(false);

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
    if (
      text.length === 0 ||
      email.length === 0 ||
      name.length == 0 ||
      phone.length === 0 ||
      password.length === 0 ||
      username.length === 0
    ) {
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      setShowDialog(true);
      dispatch(
        registerAction(date, email, name, password, phone, username, navigation)
      );
    }
  };

  const hasUnsavedChanges = Boolean(name, text, email, phone, password);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!hasUnsavedChanges) {
          return;
        }
        e.preventDefault();
        Alert.alert('Thông báo', 'Bạn muốn không muốn đăng ký nữa?', [
          { text: 'Không', style: 'cancel', onPress: () => {} },
          {
            text: 'Có',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      }),
    [navigation, hasUnsavedChanges]
  );

  let [fontsLoaded] = useFonts({
    'Courgette-Regular': require('../../../assets/fonts/Courgette-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider>
        <View>
          <ImageBackground
            resizeMode="stretch"
            source={image}
            style={{ width: '100%', height: '100%' }}
          >
            <Page>
              <KeyboardAvoidingView>
                <View>
                  <PopupOtp
                    setShowDialog={setShowDialog}
                    showDialog={showDialog}
                    navigation={navigation}
                  />
                </View>
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
                    maxLength={10}
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
                      <MaterialIcons
                        name="date-range"
                        size={28}
                        color="white"
                      />
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
                      onPress={() => registerHandler()}
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
          </ImageBackground>
        </View>
      </Provider>
    );
  }
};

export default RegisterScreen;
