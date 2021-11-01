import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from '../components/index.js';
import { COLORS } from '../constants/color.const.js';
import { ROLES } from '../constants/role.const.js';
import { getProfile, logoutAction } from '../redux/actions/authAction.js';
import { styles } from '../styles/paper.js';

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const profile = useSelector(state => state.auth.profile);
  const loading = useSelector(state => state.auth.loading);
  const store = useSelector(state => state.auth.account.role);
  const [avatar, setAvatar] = useState(profile.avatar);
  const logout = () =>
    Alert.alert('Thông báo', 'Bạn có muốn đăng xuất không?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          dispatch(logoutAction());
        },
      },
    ]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getProfile(profile.id));
    }, [])
  );

  useEffect(() => {
    dispatch(getProfile(profile.id));
  }, [dispatch]);

  return (
    <Main>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
      <View style={styles.Item}>
        <Avatar.Image
          size={60}
          source={{
            uri:
              avatar === null
                ? 'https://fakeimg.pl/350x200/?text=Hello'
                : avatar,
          }}
          onPress={() => navigation.navigate('ProfileDetail')}
        />
        <Subheading
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('ProfileDetail')}
        >
          {profile.name}
        </Subheading>
        <View style={styles.lastItem}>
          <Icon
            size={35}
            name={'chevron-right'}
            color={'#9AA0A6'}
            onPress={() => navigation.navigate('ProfileDetail')}
          />
        </View>
      </View>

      {store === ROLES.ROLE_STORE ? (
        <View>
          <Text>store</Text>
        </View>
      ) : (
        <Text></Text>
      )}
      {/* friend lists */}
      {store === ROLES.ROLE_USER && (
        <View>
          <View style={styles.Item}>
            <Ionicons
              name="ios-people-circle-outline"
              size={35}
              color="black"
              onPress={() => navigation.navigate('MainFriendScreen')}
            />
            <Text
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.navigate('MainFriendScreen')}
            >
              Bạn bè
            </Text>
            <View style={styles.lastItem}>
              <Icon
                size={35}
                name={'chevron-right'}
                color={'#9AA0A6'}
                onPress={() => navigation.navigate('MainFriendScreen')}
              />
            </View>
          </View>
        </View>
      )}

      {/* manage account */}
      <View>
        <View style={styles.Item}>
          <Icon
            size={35}
            name={'account-circle'}
            color={'black'}
            onPress={() => setShow(!show)}
          />
          <Text style={{ paddingLeft: 10 }} onPress={() => setShow(!show)}>
            Quản lý tài khoản
          </Text>
          <View style={styles.lastItem}>
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
          </View>
        </View>
        {show && (
          <View>
            <View style={styles.Item}>
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
              <View style={styles.lastItem}>
                <Icon
                  size={35}
                  name={'chevron-right'}
                  color={'#9AA0A6'}
                  onPress={() => navigation.navigate('InformationAccScreen')}
                />
              </View>
            </View>
            <View style={styles.Item}>
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
              <View style={styles.lastItem}>
                <Icon
                  size={35}
                  name={'chevron-right'}
                  color={'#9AA0A6'}
                  onPress={() => navigation.navigate('ChangePassScreen')}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      {/* logout */}
      <View style={styles.Item}>
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
      </View>
    </Main>
  );
};

export default SettingScreen;
