import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { updateProfileAction } from '../../redux/auth/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const EditPublicScreen = ({ route, navigation }) => {
  const [name, setName] = useState(route.params.profile.name);
  const [bio, setBio] = useState(route.params.profile.bio);
  const [address, setAddress] = useState(route.params.profile.address);
  const dispatch = useDispatch();
  const handlerUpdate = () => {
    dispatch(
      updateProfileAction(
        address,
        route.params.profile.avatar,
        bio,
        route.params.profile.birthday,
        route.params.profile.cover,
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
          backgroundColor: `${COLORS.blue[2]}`,
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
              label="Địa chỉ"
              mode="outlined"
              value={address}
              onChangeText={address => setAddress(address)}
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
              color={COLORS.blue[1]}
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
