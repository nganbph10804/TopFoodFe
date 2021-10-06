import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import { Main } from '../components/index.js';

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
  return (
    <Main>
      <Item style={{ marginBottom: 15, marginTop: 10 }}>
        <Avatar
          size="medium"
          rounded
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          onPress={() => navigation.navigate('ProfileDetail')}
        />
        <Text
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('ProfileDetail')}
        >
          Trang cá nhân
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
          Danh sách bạn bè
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
      {/* manage account */}
      <Item>
        <Icon size={35} name={'account-circle'} color={'black'} />
        <Text style={{ paddingLeft: 10 }}>Quản lý tài khoản</Text>
        <LastItem>
          <Icon size={35} name={'chevron-right'} color={'#9AA0A6'} />
        </LastItem>
      </Item>
      {/* logut */}
      <Item>
        <View>
          <Icon
            size={35}
            name={'logout'}
            color={'#d91b0d'}
            onPress={() => navigation.navigate('LOGIN')}
          />
        </View>
        <Text
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('LOGIN')}
        >
          Đăng xuất
        </Text>
      </Item>
    </Main>
  );
};

export default ProfileScreen;
