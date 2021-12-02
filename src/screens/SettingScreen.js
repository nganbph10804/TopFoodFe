import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/color.const.js';
import { ROLES } from '../constants/role.const.js';
import { getProfile, logoutAction } from '../redux/auth/actions/authAction.js';
import { friendListAction } from '../redux/friend/actions/friendAction.js';
import HeaderMain from '../shared/HeaderMain.js';
import { styles } from '../styles/paper.js';

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const profile = useSelector(state => state.auth.profile);
  const account = useSelector(state => state.auth.account);
  const store = useSelector(state => state.auth.account.role);
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
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(getProfile(profile.id));
      setShow(false);
      dispatch(friendListAction(0));
    });
    return focus;
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: `${COLORS.blue[4]}` }}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')}>
        <HeaderMain
          name={profile.name}
          image={profile.avatar}
          phone={account.phoneNumber}
        />
      </TouchableOpacity>
      <Card
        style={{
          width: '99.9%',
          height: '100%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignSelf: 'center',
          position: 'absolute',
          marginTop: 160,
        }}
      >
        <View style={{ marginTop: 10 }}></View>
        {store === ROLES.ROLE_USER && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainFriendScreen')}
            >
              <View style={styles.Item}>
                <Ionicons name="people-sharp" size={35} color="black" />
                <Text style={{ paddingLeft: 10 }}>Bạn bè</Text>
                <View style={styles.lastItem}>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </View>
              <Divider color={`${COLORS.gray[1]}`} />
            </TouchableOpacity>
          </View>
        )}
        {/* manage account */}
        <View>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <View style={styles.Item}>
              <MaterialIcons
                name="account-circle"
                size={35}
                color="black"
                onPress={() => setShow(!show)}
              />
              <Text style={{ paddingLeft: 10 }} onPress={() => setShow(!show)}>
                Quản lý tài khoản
              </Text>
              <View style={styles.lastItem}>
                {show ? (
                  <Entypo name="chevron-up" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-right" size={24} color="black" />
                )}
              </View>
            </View>
            <Divider color={`${COLORS.gray[1]}`} />
          </TouchableOpacity>
          {show && (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('InformationAccScreen')}
              >
                <View style={styles.Item}>
                  <MaterialCommunityIcons
                    name="account-details"
                    size={35}
                    color="black"
                  />
                  <Text style={{ paddingLeft: 10 }}>Thông tin tài khoản</Text>
                  <View style={styles.lastItem}>
                    <Entypo name="chevron-right" size={24} color="black" />
                  </View>
                </View>
                <Divider color={`${COLORS.gray[1]}`} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassScreen')}
              >
                <View style={styles.Item}>
                  <MaterialCommunityIcons
                    name="lock-reset"
                    size={35}
                    color="black"
                  />
                  <Text style={{ paddingLeft: 10 }}>Đổi mật khẩu</Text>
                  <View style={styles.lastItem}>
                    <Entypo name="chevron-right" size={24} color="black" />
                  </View>
                </View>
                <Divider color={`${COLORS.gray[1]}`} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {store === ROLES.ROLE_USER && (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditFavoriteScreen')}
          >
            <View style={styles.Item}>
              <MaterialIcons
                name="favorite"
                size={35}
                color={`${COLORS.red[2]}`}
              />
              <Text style={{ paddingLeft: 10 }}>Sở thích</Text>
              <View style={styles.lastItem}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </View>
            <Divider color={`${COLORS.gray[1]}`} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
          <View style={styles.Item}>
            <MaterialIcons name="support-agent" size={35} color="black" />
            <Text style={{ paddingLeft: 10 }}>Liên hệ</Text>
            <View style={styles.lastItem}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </View>
          <Divider color={`${COLORS.gray[1]}`} />
        </TouchableOpacity>
        {/* logout */}
        <TouchableOpacity onPress={() => logout()} z>
          <View style={styles.Item}>
            <View>
              <MaterialIcons name="logout" size={35} color={'#d91b0d'} />
            </View>
            <Text style={{ paddingLeft: 10 }} onPress={() => logout()}>
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
  },
});

export default SettingScreen;
