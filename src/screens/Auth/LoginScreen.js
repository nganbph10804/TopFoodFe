import { Entypo, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Subheading,
  TextInput,
  Title,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { loginAction } from '../../redux/auth/actions/authAction.js';
import HeaderShop from '../../shared/HeaderShop.js';
import { styles } from '../../styles/paper.js';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handlerLogin = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống username và password',
      });
    } else {
      dispatch(loginAction(username, password));
      setUsername('');
      setPassword('');
    }
  };

  return (
    <View style={styles.background}>
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
      <HeaderShop />
      <View style={styled.currentBackground}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Title style={{ fontSize: 26 }}>Đăng nhập</Title>
          </View>
          <View style={styled.input}>
            <Title>Username</Title>
            <TextInput
              mode="outlined"
              outlineColor={`${COLORS.blue[4]}`}
              selectionColor="blue"
              placeholder="Username"
              value={username}
              onChangeText={username => setUsername(username)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Ionicons
                      name="person"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <Title>Password</Title>
            <TextInput
              mode="outlined"
              outlineColor={`${COLORS.blue[4]}`}
              selectionColor="blue"
              placeholder="Password"
              secureTextEntry={show ? false : true}
              value={password}
              onChangeText={password => setPassword(password)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Entypo name="lock" size={24} color={`${COLORS.blue[4]}`} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() =>
                    show ? (
                      <Entypo
                        name="eye-with-line"
                        size={24}
                        color={`black`}
                        onPress={() => setShow(!show)}
                      />
                    ) : (
                      <Entypo
                        name="eye"
                        size={24}
                        color={`black`}
                        onPress={() => setShow(!show)}
                      />
                    )
                  }
                />
              }
            />
          </View>
          <View>
            <Subheading
              style={{
                textAlign: 'right',
                paddingRight: 50,
                marginVertical: 10,
                paddingBottom: 30,
              }}
              onPress={() => navigation.navigate('VERIFY_OTP')}
            >
              Quên mật khẩu?
            </Subheading>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              mode="contained"
              color={COLORS.blue[1]}
              onPress={() => handlerLogin()}
            >
              Đăng Nhập
            </Button>
          </View>
          <View style={{ alignSelf: 'center', marginTop: 30 }}>
            <Subheading
              style={{ color: '#000', fontSize: 17 }}
              onPress={() => navigation.navigate('REGISTER')}
            >
              Tạo tài khoản mới?
            </Subheading>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  currentBackground: {
    position: 'absolute',
    marginTop: 120,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: -10,
    backgroundColor: `${COLORS.white[1]}`,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
export default LoginScreen;
