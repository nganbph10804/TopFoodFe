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
    if (newBio === null || newAddress === null) {
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
          profile.name,
          navigation
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
      setNewCover(result.uri);
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
    <View style={styled.main}>
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
          <TouchableOpacity onPress={handlerUploadCover}>
            <Image
              source={{
                uri:
                  newCover === null
                    ? 'https://fakeimg.pl/350x200/?text=Hello'
                    : newCover,
              }}
              style={styled.image}
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: -80,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={handlerUploadAvatar}>
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
            </TouchableOpacity>
          </View>
        </View>
        <View style={styled.fill}>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Địa chỉ"
              outlineColor={`${COLORS.blue[4]}`}
              value={newAddress}
              onChangeText={newAddress => setNewAddress(newAddress)}
              left={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome5
                      name="address-card"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <InputUpdate
              mode="outlined"
              label="Giới thiệu"
              outlineColor={`${COLORS.blue[4]}`}
              value={newBio}
              onChangeText={newBio => setNewBio(newBio)}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons
                      name="file-edit-outline"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styled.input}>
            <TouchableOpacity onPress={showDatepicker}>
              <InputUpdate
                mode="outlined"
                label="Ngày sinh"
                value={birthday}
                disabled="true"
                outlineColor={`${COLORS.blue[4]}`}
                left={
                  <TextInput.Icon
                    name={() => (
                      <MaterialIcons
                        name="date-range"
                        size={24}
                        color={`${COLORS.blue[4]}`}
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
          <View style={styled.viewBtn}>
            <Button
              mode="contained"
              color={COLORS.blue[1]}
              onPress={() => updateHandler()}
            >
              Cập nhật
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styled = StyleSheet.create({
  main: {
    height: ' 100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  fill: {
    marginTop: 60,
  },
  input: {
    marginTop: 20,
  },
  viewBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
});
export default EditProfileScreen;
