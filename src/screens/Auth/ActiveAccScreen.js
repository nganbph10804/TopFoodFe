import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { InputUpdate, styles } from '../../styles/paper.js';

const ActiveAccScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const handlerActive = () => {
    if (otp.length === 0) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(activeAccAction(otp, navigation));
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
              Kích hoạt tài khoản
            </Text>
          </View>
          <View style={{ position: 'relative', paddingTop: 10 }}>
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
              onPress={() => handlerActive()}
            >
              Kích hoạt tài khoản
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ActiveAccScreen;
