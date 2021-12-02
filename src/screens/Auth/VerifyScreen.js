import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { getOtpAction } from '../../redux/auth/actions/authAction.js';
import HeaderShop from '../../shared/HeaderShop.js';
import { InputUpdate } from '../../styles/paper.js';

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
    <View style={{ flex: 1, backgroundColor: `${COLORS.blue[4]}` }}>
      <HeaderShop />
      <View
        style={{
          paddingTop: 40,
          backgroundColor: `${COLORS.white[1]}`,
          width: '100%',
          position: 'absolute',
          zIndex: 900,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          top: 130,
          height: '100%',
        }}
      >
        <View style={{ paddingTop: 20 }}>
          <Title
            style={{
              fontSize: 27,
              alignSelf: 'center',
            }}
          >
            Gửi mã xác nhận
          </Title>
        </View>
        <View style={{ position: 'relative', paddingTop: 10 }}>
          <InputUpdate
            outlineColor="blue"
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
  );
};

export default VerifyScreen;
