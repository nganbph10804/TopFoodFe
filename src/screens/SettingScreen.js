import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from '../components/index.js';
import { ROLES } from '../constants/role.const.js';
import { getProfile, logoutAction } from '../redux/actions/authAction.js';
import HeaderMain from '../shared/HeaderMain.js';
import { styles } from '../styles/paper.js';

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const profile = useSelector(state => state.auth.profile);
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

  useFocusEffect(
    useCallback(() => {
      dispatch(getProfile(profile.id));
    }, [dispatch])
  );

  return (
    <Main>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')}>
        <HeaderMain name={profile.name} image={profile.avatar} />
      </TouchableOpacity>
      {/* friend lists */}
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
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* logout */}
      <TouchableOpacity onPress={() => logout()}>
        <View style={styles.Item}>
          <View>
            <MaterialIcons name="logout" size={35} color={'#d91b0d'} />
          </View>
          <Text style={{ paddingLeft: 10 }} onPress={() => logout()}>
            Đăng xuất
          </Text>
        </View>
      </TouchableOpacity>
    </Main>
  );
};

export default SettingScreen;
