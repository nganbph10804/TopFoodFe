import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { changePassAction } from '../../redux/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const ChangePassScreen = () => {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);

  const changePassHandler = () => {
    if (password.trim().length === 0 || newPass.trim().length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(changePassAction(newPass, password));
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
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator
              animating={true}
              color={`${COLORS.blue[1]}`}
              size={'large'}
            />
          </View>
        )}
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
                Đổi mật khẩu.
              </Text>
            </View>
            <View style={{ position: 'relative', paddingTop: 10 }}>
              <InputUpdate
                mode="outlined"
                label="Mật khẩu cũ"
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
                label="Mật khẩu mới"
                secureTextEntry={show ? false : true}
                value={newPass}
                onChangeText={newPass => setNewPass(newPass)}
                right={
                  <TextInput.Icon name="eye" onPress={() => setShow(!show)} />
                }
              />
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Button
                mode="contained"
                color="#3c6dcc"
                onPress={() => changePassHandler()}
              >
                Cập nhật
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default ChangePassScreen;
