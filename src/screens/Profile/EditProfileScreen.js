import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  TextInput,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { updateProfileAction } from '../../redux/actions/authAction.js';
import { uploadAvatar, uploadCover } from '../../redux/actions/fileAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const EditProfileScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const loading = useSelector(state => state.auth.loading);
  const [cover, setCover] = useState(profile.cover);
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [bio, setBio] = useState(profile.bio);
  const [address, setAddress] = useState(profile.address);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(new Date(profile.birthday));
  const dispatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let fDate =
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear();
    setText(fDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const updateHandler = () => {
    if (
      address.length === 0 ||
      avatar.length === 0 ||
      bio.length === 0 ||
      cover.length === 0 ||
      name.length === 0
    ) {
      Toast.show({
        type: 'error',
        topOffset: 60,
        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(
        updateProfileAction(
          address,
          avatar,
          bio,
          date,
          cover,
          name,
          null,
          profile.id
        )
      );
    }
  };

  const handlerUploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
      dispatch(uploadAvatar(result.uri, profile, navigation));
    }
  };

  const handlerUploadCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setCover(result.uri);
      dispatch(uploadCover(result.uri, profile, navigation));
    }
  };

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

  return (
    <View style={style.main}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
      <ScrollView>
        <View>
          <View>
            <Image
              source={{
                uri:
                  urlCover === null
                    ? cover === null
                      ? 'https://fakeimg.pl/350x200/?text=Hello'
                      : cover
                    : urlCover,
              }}
              style={style.image}
            />
            <TouchableOpacity
              style={style.iconCover}
              onPress={handlerUploadCover}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color="black"
                style={{ padding: 5 }}
                onPress={handlerUploadCover}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: -100,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Avatar.Image
                style={{
                  borderWidth: 2,
                  borderColor: `${COLORS.blue[1]}`,
                  overflow: 'hidden',
                }}
                source={{
                  uri:
                    urlAvatar === null
                      ? avatar === null
                        ? 'https://fakeimg.pl/350x200/?text=Hello'
                        : avatar
                      : urlAvatar,
                }}
                size={120}
              />
              <TouchableOpacity
                style={style.touch}
                onPress={handlerUploadAvatar}
              >
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color="black"
                  style={{ padding: 5 }}
                  onPress={handlerUploadAvatar}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.fill}>
          <View style={styles.card}>
            <View style={{ position: 'relative', paddingTop: 10 }}>
              <InputUpdate
                mode="outlined"
                label="Họ và tên"
                value={name}
                onChangeText={name => setName(name)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Ionicons name="person" size={24} color="black" />
                    )}
                  />
                }
              />
            </View>
            <View style={{ position: 'relative', paddingTop: 20 }}>
              <InputUpdate
                mode="outlined"
                label="Địa chỉ"
                value={address}
                onChangeText={address => setAddress(address)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <FontAwesome5
                        name="address-card"
                        size={24}
                        color="black"
                      />
                    )}
                  />
                }
              />
            </View>
            <View style={{ position: 'relative', paddingTop: 20 }}>
              <InputUpdate
                mode="outlined"
                label="Giới thiệu"
                value={bio}
                onChangeText={bio => setBio(bio)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <MaterialCommunityIcons
                        name="file-edit-outline"
                        size={24}
                        color="black"
                      />
                    )}
                  />
                }
              />
            </View>
            <View style={{ position: 'relative', paddingTop: 20 }}>
              <TouchableOpacity onPress={showDatepicker}>
                <InputUpdate
                  mode="outlined"
                  label="Ngày sinh"
                  value={text}
                  disabled="true"
                  left={
                    <TextInput.Icon
                      name={() => (
                        <MaterialIcons
                          name="date-range"
                          size={24}
                          color="black"
                          onPress={showDatepicker}
                        />
                      )}
                    />
                  }
                />
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={style.viewBtn}>
              <Button
                mode="contained"
                color={COLORS.blue[1]}
                onPress={() => updateHandler()}
              >
                Cập nhật
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  touch: {
    backgroundColor: `${COLORS.purple[4]}`,
    borderRadius: 80,
    bottom: 40,
    right: -40,
  },
  image: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  iconCover: {
    position: 'absolute',
    bottom: -20,
    right: 38,
    backgroundColor: `${COLORS.purple[4]}`,
    borderRadius: 80,
    alignSelf: 'center',
  },
  fill: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  viewBtn: {
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
    marginTop: 20,
  },
});

export default EditProfileScreen;
