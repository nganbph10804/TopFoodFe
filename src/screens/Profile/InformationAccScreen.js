import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Avatar, Subheading, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import HeaderUser from '../../shared/HeaderUser.js';

const InformationAccScreen = () => {
  const auth = useSelector(state => state.auth);
  const [date, setDate] = useState(new Date(auth.profile.birthday));
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <HeaderUser />
      <View style={{ backgroundColor: '#fff' }}>
        <View
          style={{
            width: '100%',
            height: '40%',
            position: 'relative',
          }}
        >
          <View style={{ width: '100%', height: '100%' }}>
            <Image
              source={{
                uri: `${auth.profile.cover}`,
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Title style={{ marginLeft: 20, marginRight: 15 }}>Username</Title>
          <Subheading>{auth.account.username} </Subheading>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',

            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Title style={{ marginLeft: 20, marginRight: 60 }}>Email</Title>
          <Subheading>{auth.account.email}</Subheading>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Title style={{ marginLeft: 20, marginRight: 15 }}>Điện thoại</Title>
          <Subheading>{auth.account.phoneNumber} </Subheading>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Title style={{ marginLeft: 20, marginRight: 45 }}>Địa chỉ</Title>
          <ScrollView horizontal={true}>
            <Subheading>{auth.profile.address}</Subheading>
          </ScrollView>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Title style={{ marginLeft: 20, marginRight: 15 }}>Ngày sinh</Title>
          <Subheading>
            {date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear()}
          </Subheading>
        </View>
      </View>
    </View>
  );
};

export default InformationAccScreen;
