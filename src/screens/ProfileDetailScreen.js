import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Main } from '../components/index.js';

const ProfileDetailScreen = ({ navigation }) => {
  const { cover, avatar, address, birthday, bio, name } = useSelector(
    state => state.auth.profile
  );
  const [date, setDate] = useState(new Date(birthday));
  useEffect(() => {
    if (avatar === null) {
      return navigation.navigate('EditProfile');
    }
  }, []);
  return (
    <Main>
      <View style={{ width: '100%', height: '45%' }}>
        <Image
          source={{ uri: `${cover}` }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            resizeMode: 'cover',
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          top: '38%',
          borderBottomWidth: 2,
          borderBottomColor: '#e0dcdc',
          paddingBottom: 10,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              overflow: 'hidden',
            }}
            source={{
              uri: `${avatar}`,
            }}
          />
          <Text style={{ fontSize: 22 }}>{name} </Text>
          <Text style={{ fontSize: 18 }}>{bio} </Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="edit"
              size={28}
              color="black"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <Text
              style={{ fontSize: 18 }}
              onPress={() => navigation.navigate('EditProfile')}
            >
              Chỉnh sửa
            </Text>
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', top: '63%', width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#e0dcdc',
            borderBottomWidth: 2,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <FontAwesome
            style={{ paddingLeft: 20 }}
            name="map-marker"
            size={30}
            color="black"
          />
          <Text style={{ paddingLeft: 20, fontSize: 22 }}>
            Địa chỉ: {address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#e0dcdc',
            borderBottomWidth: 2,
            padding: 10,
          }}
        >
          <MaterialIcons
            style={{ paddingLeft: 13 }}
            name="date-range"
            size={30}
            color="black"
          />
          <Text style={{ fontSize: 22, paddingLeft: 13 }}>
            Ngày sinh:{' '}
            {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
          </Text>
        </View>
      </View>
    </Main>
  );
};

export default ProfileDetailScreen;
