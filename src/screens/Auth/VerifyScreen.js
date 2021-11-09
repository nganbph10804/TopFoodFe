import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { getOtpAction } from '../../redux/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const VerifyScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const verifyHandler = () => {
    if (email.trim().length === 0) {
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: 'Không được để trống email.',
      });
    } else {
      dispatch(getOtpAction(email, navigation));
    }
  };

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
              Gửi mã xác nhận
            </Text>
          </View>
          <View style={{ position: 'relative', paddingTop: 10 }}>
            <InputUpdate
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Button
              mode="contained"
              color="#3c6dcc"
              onPress={() => verifyHandler()}
            >
              Gửi mã xác nhận
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyScreen;
