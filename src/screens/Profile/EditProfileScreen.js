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
import { updateProfileAction } from '../../redux/auth/actions/authAction.js';
import {
  uploadAvatar,
  uploadCover,
} from '../../redux/file/actions/fileAction.js';
import { InputUpdate, styles } from '../../styles/paper.js';

const EditProfileScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const loading = useSelector(state => state.auth.loading);
  const [newCover, setNewCover] = useState(profile.cover);
  const [newName, setNewName] = useState(profile.name);
  const [newAvatar, setNewAvatar] = useState(profile.avatar);
  const [newBio, setNewBio] = useState(profile.bio);
  const [newAddress, setNewAddress] = useState(profile.address);
  const [date, setDate] = useState(new Date(profile.birthday));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const birthday =
    date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  const dispatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
      newCover === null ||
      newName === null ||
      newAvatar === null ||
      newBio === null ||
      newAddress === null
    ) {
      Toast.show({
        type: 'error',

        text1: 'Thông báo',
        text2: 'Không được để trống.',
      });
    } else {
      dispatch(
        updateProfileAction(
          newAddress,
          newAvatar,
          newBio,
          date,
          newCover,
          newName,
          navigation,
          id
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
      setNewAvatar(result.uri);
      dispatch(uploadAvatar(result.uri, profile, null));
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
      setNewCover(result.uri);
      dispatch(uploadCover(result.uri, profile, null));
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
                  newCover === null
                    ? 'https://fakeimg.pl/350x200/?text=Hello'
                    : newCover,
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
                    newAvatar === null
                      ? 'https://fakeimg.pl/350x200/?text=Hello'
                      : newAvatar,
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
                value={newName}
                onChangeText={newName => setNewName(newName)}
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
                value={newAddress}
                onChangeText={newAddress => setNewAddress(newAddress)}
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
                value={newBio}
                onChangeText={newBio => setNewBio(newBio)}
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
                  value={birthday}
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

export default EditProfileScreen;
