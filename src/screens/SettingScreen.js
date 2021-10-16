import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Main } from '../components/index.js';
import { logoutAction } from '../redux/actions/authAction.js';
import { authHeader } from '../redux/authHeader.js';

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
  const profile = useSelector(state => state.auth.profile);
  const logout = () =>
    Alert.alert('Thông báo', 'Bạn có muốn đăng xuất không?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          navigation.navigate('LOGIN');
          dispatch(logoutAction());
        },
      },
    ]);

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
        <Subheading
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('ProfileDetail')}
        >
          {profile.name}
        </Subheading>
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
          <Ionicons
            name="ios-people-circle-outline"
            size={35}
            color="black"
            onPress={() => navigation.navigate('MainScreen')}
          />
          <Text
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate('MainScreen')}
          >
            Bạn bè
          </Text>
          <LastItem>
            <Icon
              size={35}
              name={'chevron-right'}
              color={'#9AA0A6'}
              onPress={() => navigation.navigate('MainScreen')}
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
              <Icon
                size={35}
                name={'chevron-right'}
                color={'#9AA0A6'}
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
                onPress={() => navigation.navigate('InformationAccScreen')}
              />
              <Text
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.navigate('InformationAccScreen')}
              >
                Thông tin tài khoản
              </Text>
              <LastItem>
                <Icon
                  size={35}
                  name={'chevron-right'}
                  color={'#9AA0A6'}
                  onPress={() => navigation.navigate('InformationAccScreen')}
                />
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
      {/* logout */}
      <Item>
        <View>
          <Icon
            size={35}
            name={'logout'}
            color={'#d91b0d'}
            onPress={() => logout()}
          />
        </View>
        <Text style={{ paddingLeft: 10 }} onPress={() => logout()}>
          Đăng xuất
        </Text>
      </Item>
    </Main>
  );
};

export default ProfileScreen;
