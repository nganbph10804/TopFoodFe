import React, { useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { activeAccAction } from '../redux/actions/authAction.js';

const PopupOtp = ({ showDialog, setShowDialog, navigation }) => {
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
      setShowDialog(false);
      dispatch(activeAccAction(otp, navigation));
    }
  };
  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={hideDialog}>
        <Dialog.Title>OTP</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Nhập OTP"
            value={otp}
            onChangeText={otp => setOtp(otp)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handlerActive}>Gửi</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PopupOtp;
