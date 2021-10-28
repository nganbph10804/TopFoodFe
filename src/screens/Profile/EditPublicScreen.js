import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { updateProfileAction } from '../../redux/actions/authAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { uploadAction } from '../../redux/actions/uploadAction.js';
import { BASE_URL } from '../../constants/file.const.js';

const EditPublicScreen = ({ route, navigation }) => {
  const [cover, setCover] = useState(route.params.profile.cover);
  const [name, setName] = useState(route.params.profile.name);
  const [avatar, setAvatar] = useState(route.params.profile.avatar);
  const [bio, setBio] = useState(route.params.profile.bio);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const { file } = useSelector(state => state.file);
  console.log(
    'log 🚀 ~ file: EditPublicScreen.js ~ line 29 ~ EditPublicScreen ~ file',
    file
  );
  const urlImage = BASE_URL + file.map(t => t.path);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handlerUploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('avatar', result);
    if (!result.cancelled) {
      setImage(result.uri);
      dispatch(uploadAction(result.uri));
    }
  };
  const handlerUpdate = () => {
    dispatch(
      updateProfileAction(
        route.params.profile.address,
        urlImage,
        bio,
        route.params.profile.birthday,
        imageCover,
        name,
        navigation,
        route.params.profile.id
      )
    );
  };

  const handlerUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('cover', result);
    if (!result.cancelled) {
      setImageCover(result.uri);
      dispatch(uploadAction(result.uri));
    }
  };
  console.log(
    'log 🚀 ~ file: EditPublicScreen.js ~ line 21 ~ EditPublicScreen ~ cover',
    cover,
    avatar
  );
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
        <View
          style={{
            width: '100%',
            height: '37%',
            position: 'relative',
            top: '-12%',
          }}
        >
          <View>
            <Image
              source={{ uri: imageCover === null ? cover : imageCover }}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                resizeMode: 'cover',
              }}
            />
            <TouchableOpacity style={styles.iconCover} onPress={handlerUpload}>
              <AntDesign
                name="camera"
                size={24}
                color="black"
                style={{ padding: 5 }}
                onPress={handlerUpload}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Avatar.Image
              source={{ uri: image === null ? avatar : image }}
              size={120}
            />
            <TouchableOpacity
              style={styles.iconAvatar}
              onPress={handlerUploadAvatar}
            >
              <AntDesign
                name="camera"
                size={24}
                color="black"
                style={{ padding: 5 }}
                onPress={handlerUploadAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>
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
