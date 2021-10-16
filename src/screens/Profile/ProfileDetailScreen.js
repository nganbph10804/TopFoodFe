import { Entypo } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Main } from '../../components/index.js';

const ProfileDetailScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  useEffect(() => {
    if (profile.avatar === null) {
      return navigation.navigate('EditProfile');
    }
  }, []);
  return (
    <Main>
      <View style={{ width: '100%', height: '45%' }}>
        <Image
          source={{ uri: `${profile.cover}` }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={{ position: 'absolute', width: '100%', top: '37%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
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
                uri: `${profile.avatar}`,
              }}
            />
            <Title style={{ fontSize: 22, fontWeight: 'bold' }}>
              {profile.name}
            </Title>
            <Subheading style={{ fontSize: 18 }}>{profile.bio} </Subheading>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#3c6dcc',
                padding: 10,
                borderRadius: 10,
                marginTop: '70%',
              }}
            >
              <Entypo name="edit" size={24} color="black" />
              <Text
                style={{ color: '#3c6dcc', fontSize: 18, fontWeight: 'bold' }}
                onPress={() => navigation.navigate('EditPublic', { profile })}
              >
                Chỉnh sửa
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};

export default ProfileDetailScreen;
