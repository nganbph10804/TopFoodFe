import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Subheading, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  activeAccAction,
  activeAction,
} from '../../redux/auth/actions/authAction.js';
import HeaderShop from '../../shared/HeaderShop.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const ActiveAccScreen = ({ navigation }) => {
  const auth = useSelector(state => state.auth.account);
  const { status } = useSelector(state => state.auth.account);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const handlerActive = () => {
    if (otp.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(activeAccAction(otp, navigation));
    }
  };
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      if (status === 'WAIT_ACTIVE') {
        dispatch(activeAction(auth.email));
      }
    });
    return focus;
  }, [dispatch]);
  return (
    <View style={styles.background}>
      <HeaderShop />
      <View style={styled.currentBackground}>
        <View style={{ paddingTop: 20, alignItems: 'center' }}>
          <Title style={styles.title}>Kích hoạt tài khoản</Title>
        </View>
        <View style={{ position: 'relative', paddingTop: 10 }}>
          <InputUpdate
            mode="outlined"
            label="Otp"
            outlineColor={`${COLORS.blue[4]}`}
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
});
export default ActiveAccScreen;
