import {
  Entypo,
  EvilIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  BtnDate,
  CustomInput,
  ViewDate,
  ViewDateUser,
} from '../components/index.js';
import { updateProfileAction } from '../redux/actions/authAction.js';

const EditProfileScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const [cover, setCover] = useState(profile.cover);
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [address, setAddress] = useState(profile.address);
  const [bio, setBio] = useState(profile.bio);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(new Date(profile.birthday));

  const dispatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setText(currentDate);
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
        updateProfileAction(address, avatar, bio, date, cover, name, navigation)
      );
    }
  };

  return (
    <View style={{ marginTop: '10%' }}>
      {/* name */}
      <View style={{ position: 'relative' }}>
        <CustomInput
          style={{ paddingLeft: 50 }}
          value={name}
          onChangeText={name => setName(name)}
        />
        <Ionicons
          name="person"
          size={24}
          color="black"
          style={{ position: 'absolute', top: 13, left: 55 }}
        />
      </View>
      {/* cover */}
      <View style={{ position: 'relative' }}>
        <CustomInput
          style={{ paddingLeft: 50 }}
          value={cover}
          onChangeText={cover => setCover(cover)}
        />
        <EvilIcons
          name="image"
          size={30}
          color="black"
          style={{ position: 'absolute', top: 13, left: 55 }}
        />
      </View>
      {/* bio */}
      <View style={{ position: 'relative' }}>
        <CustomInput
          style={{ paddingLeft: 50 }}
          value={bio}
          onChangeText={bio => setBio(bio)}
        />
        <Entypo
          name="edit"
          size={24}
          color="black"
          style={{ position: 'absolute', top: 13, left: 55 }}
        />
      </View>
      {/* avatar */}
      <View style={{ position: 'relative' }}>
        <CustomInput
          style={{ paddingLeft: 50 }}
          value={avatar}
          onChangeText={avatar => setAvatar(avatar)}
        />
        <EvilIcons
          name="image"
          size={30}
          color="black"
          style={{ position: 'absolute', top: 13, left: 55 }}
        />
      </View>
      {/* address */}
      <View style={{ position: 'relative' }}>
        <CustomInput
          style={{ paddingLeft: 50 }}
          value={address}
          onChangeText={address => setAddress(address)}
        />
        <FontAwesome
          name="map-marker"
          size={24}
          color="black"
          style={{ position: 'absolute', top: 13, left: 60 }}
        />
      </View>
      {/* date */}
      <View style={{ marginBottom: 30 }}>
        <View
          style={{
            position: 'relative',
          }}
        >
          <BtnDate onPress={showDatepicker}>
            <MaterialIcons name="date-range" size={28} color="black" />
          </BtnDate>
          <ViewDateUser>
            {text.getDate() +
              '/' +
              (text.getMonth() + 1) +
              '/' +
              text.getFullYear()}
          </ViewDateUser>
        </View>
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
      <View style={{ width: '30%', alignSelf: 'center' }}>
        <Button mode="contained" onPress={() => updateHandler()}>
          Cập nhật
        </Button>
      </View>
    </View>
  );
};

export default EditProfileScreen;
