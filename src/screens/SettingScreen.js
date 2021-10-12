import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import deviceStorage from '../redux/deviceStorage .js';
import { Main } from '../components/index.js';
import { logoutAction } from '../redux/actions/authAction.js';

const Item = styled(View)`
  background-color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0;
`;

const LastItem = styled(View)`
  position: absolute;
  right: 20px;
`;

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showFr, setShowFr] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const logoutHandler = async () => {
    setVisible(false);
    dispatch(logoutAction());
    navigation.navigate('LOGIN');
  };
  const profile = useSelector(state => state.auth.profile);

  const click = async () => {
    // const token = await AsyncStorage.getItem('jwt');
    // console.log(token);
    const token = await deviceStorage.loadJWT();
    console.log(
      'log 🚀 ~ file: SettingScreen.js ~ line 51 ~ click ~ token',
      token
    );
  };

  return (
    <Main>
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
        <Avatar
          size="medium"
          rounded
          source={{
            uri: `${profile.avatar}`,
          }}
          onPress={() => navigation.navigate('ProfileDetail')}
        />
        <Text
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('ProfileDetail')}
        >
          {profile.name}
        </Text>
        <LastItem>
          <Icon
            size={35}
            name={'chevron-right'}
            color={'#9AA0A6'}
            onPress={() => navigation.navigate('ProfileDetail')}
          />
        </LastItem>
      </Item>
      {/* friend lists */}
      <View>
        <Item>
          <Icon
            size={35}
            name={'people'}
            color={'black'}
            onPress={() => navigation.navigate('Friends')}
          />
          <Text
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate('Friends')}
          >
            Bạn bè
          </Text>
          <LastItem>
            <Icon
              size={35}
              name={'chevron-right'}
              color={'#9AA0A6'}
              onPress={() => navigation.navigate('Friends')}
            />
          </LastItem>
        </Item>
      </View>

      {/* manage account */}
      <View>
        <Item>
          <Icon
            size={35}
            name={'account-circle'}
            color={'black'}
            onPress={() => setShow(!show)}
          />
          <Text style={{ paddingLeft: 10 }} onPress={() => setShow(!show)}>
            Quản lý tài khoản
          </Text>
          <LastItem>
            {show ? (
              <AntDesign
                name="arrowup"
                size={24}
                color="#9AA0A6"
                style={{ paddingRight: 7 }}
                onPress={() => setShow(!show)}
              />
            ) : (
              <AntDesign
                name="arrowdown"
                size={24}
                color="#9AA0A6"
                style={{ paddingRight: 7 }}
                onPress={() => setShow(!show)}
              />
            )}
          </LastItem>
        </Item>
        {show && (
          <View>
            <Item>
              <MaterialCommunityIcons
                name="account-details"
                size={35}
                color="black"
              />
              <Text style={{ paddingLeft: 10 }} onPress={() => click()}>
                Thông tin tài khoản
              </Text>
              <LastItem>
                <Icon size={35} name={'chevron-right'} color={'#9AA0A6'} />
              </LastItem>
            </Item>
            <Item>
              <MaterialCommunityIcons
                name="lock-reset"
                size={35}
                color="black"
                onPress={() => navigation.navigate('ChangePassScreen')}
              />
              <Text
                onPress={() => navigation.navigate('ChangePassScreen')}
                style={{ paddingLeft: 10 }}
              >
                Đổi mật khẩu
              </Text>
              <LastItem>
                <Icon
                  size={35}
                  name={'chevron-right'}
                  color={'#9AA0A6'}
                  onPress={() => navigation.navigate('ChangePassScreen')}
                />
              </LastItem>
            </Item>
          </View>
        )}
      </View>
      {/* logut */}
      <Item>
        <View>
          <Icon
            size={35}
            name={'logout'}
            color={'#d91b0d'}
            onPress={() => showDialog()}
          />
        </View>
        <Text style={{ paddingLeft: 10 }} onPress={() => showDialog()}>
          Đăng xuất
        </Text>
      </Item>
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={logoutHandler}>
              <Dialog.Title>Thông Báo</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Đăng xuất thành công. Vui lòng đăng nhập lại.
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={logoutHandler}>Đóng</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </Main>
  );
};

export default ProfileScreen;
