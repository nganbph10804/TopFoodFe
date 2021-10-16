import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, Paragraph, Title } from 'react-native-paper';
import { Main } from '../../components/index.js';

const PublicProfileScreen = ({ route }) => {
  const profile = route.params.profile;
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
            <Avatar.Image
              size={100}
              source={{
                uri: `${profile.avatar}`,
              }}
            />
            <Title>{profile.name}</Title>
            <Paragraph>{profile.bio} </Paragraph>
          </View>
        </View>
      </View>
    </Main>
  );
};

export default PublicProfileScreen;
