import { AntDesign, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  TextInput,
  Title,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { validateEmail } from '../../constants/validate.const.js';
import { registerAction } from '../../redux/auth/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

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
  const loading = useSelector(state => state.auth.loading);

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
      text.trim().length === 0 ||
      email.trim().length === 0 ||
      name.trim().length == 0 ||
      phone.trim().length === 0 ||
      password.trim().length === 0 ||
      username.trim().length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Th??ng b??o',
        text2: 'Kh??ng ???????c ????? tr???ng.',
      });
    } else if (!email.match(validateEmail)) {
      Toast.show({
        type: 'error',
        text1: 'Th??ng b??o',
        text2: 'Sai ?????nh d???ng email',
      });
    } else {
      dispatch(
        registerAction(date, email, name, password, phone, username, navigation)
      );
    }
  };

  return (
    <Card style={styled.main}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[4]}`}
            size={'large'}
            style={{ zIndex: 999999 }}
          />
        </View>
      )}
      <ScrollView>
        <View style={{ marginTop: 40 }}>
          <Title style={{ alignSelf: 'center', fontSize: 27 }}>????ng k??</Title>
        </View>
        <View style={styled.input}>
          <InputUpdate
            mode="outlined"
            label="H??? v?? t??n"
            value={name}
            onChangeText={name => setName(name)}
            outlineColor={`${COLORS.blue[4]}`}
            left={
              <TextInput.Icon
                name={() => (
                  <AntDesign
                    name="user"
                    size={24}
                    color={`${COLORS.blue[4]}`}
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
            outlineColor={`${COLORS.blue[4]}`}
            left={
              <TextInput.Icon
                name={() => (
                  <MaterialIcons
                    name="email"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
                )}
              />
            }
          />
        </View>
        <View style={styled.input}>
          <InputUpdate
            mode="outlined"
            label="S??? ??i???n tho???i"
            keyboardType="number-pad"
            value={phone}
            onChangeText={phone => setPhone(phone)}
            maxLength={10}
            outlineColor={`${COLORS.blue[4]}`}
            left={
              <TextInput.Icon
                name={() => (
                  <AntDesign
                    name="phone"
                    size={24}
                    color={`${COLORS.blue[4]}`}
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
            outlineColor={`${COLORS.blue[4]}`}
            left={
              <TextInput.Icon
                name={() => (
                  <AntDesign
                    name="user"
                    size={24}
                    color={`${COLORS.blue[4]}`}
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
            outlineColor={`${COLORS.blue[4]}`}
            left={
              <TextInput.Icon
                name={() =>
                  hidden ? (
                    <Entypo
                      name="eye-with-line"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                      onPress={() => setHidden(!hidden)}
                    />
                  ) : (
                    <Entypo
                      name="eye"
                      size={24}
                      color={`${COLORS.blue[4]}`}
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
              label="Ng??y sinh"
              editable={true}
              value={text}
              outlineColor={`${COLORS.blue[4]}`}
              onFocus={showDatepicker}
              left={
                <TextInput.Icon
                  name={() => (
                    <Fontisto
                      name="date"
                      size={24}
                      color={`${COLORS.blue[4]}`}
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
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Button
            mode="contained"
            color={COLORS.blue[1]}
            onPress={() => registerHandler()}
          >
            ????ng K??
          </Button>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 20 }}>
          <Text
            style={{ color: '#000', fontSize: 17 }}
            onPress={() => navigation.goBack()}
          >
            ???? c?? t??i kho???n?
          </Text>
        </View>
      </ScrollView>
    </Card>
  );
};

const styled = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  main: {
    backgroundColor: `${COLORS.white[1]}`,
    flex: 1,
  },
});
export default RegisterScreen;
