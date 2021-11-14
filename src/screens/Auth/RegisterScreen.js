import { useFonts } from '@expo-google-fonts/inter';
import { AntDesign, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { BtnLogin } from '../../components/index.js';
import { COLORS } from '../../constants/color.const.js';
import { registerAction } from '../../redux/auth/actions/authAction.js';
import { InputUpdate } from '../../styles/paper.js';

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

  let [fontsLoaded] = useFonts({
    'Courgette-Regular': require('../../../assets/fonts/Courgette-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Card style={styled.main}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                fontFamily: 'Courgette-Regular',
                fontSize: 27,
                color: '#000',
                paddingLeft: 30,
              }}
            >
              Đăng ký
            </Text>
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Họ và tên"
              value={name}
              onChangeText={name => setName(name)}
              left={
                <TextInput.Icon
                  name={() => (
                    <AntDesign
                      name="user"
                      size={24}
                      color={`${COLORS.purple[3]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={email => setEmail(email)}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialIcons
                      name="email"
                      size={24}
                      color={`${COLORS.purple[3]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Số điện thoại"
              keyboardType="number-pad"
              value={phone}
              onChangeText={phone => setPhone(phone)}
              maxLength={10}
              left={
                <TextInput.Icon
                  name={() => (
                    <AntDesign
                      name="phone"
                      size={24}
                      color={`${COLORS.purple[3]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={username => setUsername(username)}
              left={
                <TextInput.Icon
                  name={() => (
                    <AntDesign
                      name="user"
                      size={24}
                      color={`${COLORS.purple[3]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={hidden ? false : true}
              left={
                <TextInput.Icon
                  name={() =>
                    hidden ? (
                      <Entypo
                        name="eye-with-line"
                        size={24}
                        color={`${COLORS.purple[3]}`}
                        onPress={() => setHidden(!hidden)}
                      />
                    ) : (
                      <Entypo
                        name="eye"
                        size={24}
                        color={`${COLORS.purple[3]}`}
                        onPress={() => setHidden(!hidden)}
                      />
                    )
                  }
                />
              }
            />
          </View>
          <View style={styled.input}>
            <TouchableOpacity onPress={showDatepicker}>
              <InputUpdate
                mode="outlined"
                label="Ngày sinh"
                disabled={true}
                value={text}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Fontisto
                        name="date"
                        size={24}
                        color={`${COLORS.purple[3]}`}
                        onPress={showDatepicker}
                      />
                    )}
                  />
                }
              />
            </TouchableOpacity>
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
              style={{ color: '#000', fontSize: 17 }}
              onPress={() => navigation.goBack()}
            >
              Đã có tài khoản?
            </Text>
          </View>
        </KeyboardAvoidingView>
      </Card>
    );
  }
};

const styled = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  main: {
    backgroundColor: `${COLORS.blue[2]}`,
    flex: 1,
  },
});
export default RegisterScreen;
