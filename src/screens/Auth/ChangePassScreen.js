import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
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
import { changePassAction } from '../../redux/auth/actions/authAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

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
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(changePassAction(newPass, password));
    }
  };

  return (
    <View style={styles.background}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
      <HeaderUser />
      <View style={styles.currentForm}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 50,
            backgroundColor: `${COLORS.white[1]}`,
          }}
        >
          <View style={{ alignItems: 'center', paddingBottom: 20 }}>
            <Title>Đổi mật khẩu</Title>
          </View>
          <View>
            <Subheading>Mật khẩu cũ</Subheading>
            <TextInput
              mode="outlined"
              label="Mật khẩu cũ"
              secureTextEntry={hidden ? false : true}
              value={password}
              onChangeText={password => setPassword(password)}
              outlineColor="blue"
              left={
                <TextInput.Icon
                  name={() =>
                    hidden ? (
                      <Entypo
                        name="eye-with-line"
                        size={24}
                        color={`black`}
                        onPress={() => setHidden(!hidden)}
                      />
                    ) : (
                      <Entypo
                        name="eye"
                        size={24}
                        color={`black`}
                        onPress={() => setHidden(!hidden)}
                      />
                    )
                  }
                />
              }
            />
          </View>
          <View style={{ position: 'relative', paddingTop: 20 }}>
            <Subheading>Mật khẩu mới</Subheading>
            <TextInput
              mode="outlined"
              label="Mật khẩu mới"
              secureTextEntry={show ? false : true}
              value={newPass}
              onChangeText={newPass => setNewPass(newPass)}
              outlineColor="blue"
              left={
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
    </View>
  );
};

export default ChangePassScreen;
