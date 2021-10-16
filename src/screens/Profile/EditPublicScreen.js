import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { InputUpdate, styles } from '../../styles/paper.js';
import { updateProfileAction } from '../../redux/actions/authAction.js';

const EditPublicScreen = ({ route, navigation }) => {
  const [cover, setCover] = useState(route.params.profile.cover);
  const [name, setName] = useState(route.params.profile.name);
  const [avatar, setAvatar] = useState(route.params.profile.avatar);
  const [bio, setBio] = useState(route.params.profile.bio);

  const dispatch = useDispatch();
  const handlerUpdate = () => {
    dispatch(
      updateProfileAction(
        route.params.profile.address,
        avatar,
        bio,
        route.params.profile.birthday,
        cover,
        name,
        navigation,
        route.params.profile.id
      )
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ADD8E6',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.card}>
          <View style={{ marginBottom: 20, paddingTop: 30 }}>
            <InputUpdate
              label="Họ tên"
              mode="outlined"
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <InputUpdate
              label="Giới thiệu"
              mode="outlined"
              value={bio}
              onChangeText={bio => setBio(bio)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <InputUpdate
              label="Ảnh bìa"
              mode="outlined"
              value={cover}
              onChangeText={cover => setCover(cover)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <InputUpdate
              label="Avatar"
              mode="outlined"
              value={avatar}
              onChangeText={avatar => setAvatar(avatar)}
            />
          </View>
          <View
            style={{
              width: 150,
              alignItems: 'center',
              alignSelf: 'center',
              paddingBottom: 30,
            }}
          >
            <Button
              mode="contained"
              color="#3c6dcc"
              onPress={() => handlerUpdate()}
            >
              Cập nhật
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditPublicScreen;
