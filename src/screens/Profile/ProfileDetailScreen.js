import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  Subheading,
  Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { ROLES } from '../../constants/role.const.js';
import {
  uploadAvatar,
  uploadCover,
} from '../../redux/file/actions/fileAction.js';
import { listStoreFollowAction } from '../../redux/follow/followAction.js';
import { styles } from '../../styles/paper.js';

const ProfileDetailScreen = ({ navigation }) => {
  const profile = useSelector(state => state.auth.profile);
  const friend = useSelector(state => state.friend.friend);
  const store = useSelector(state => state.auth.account.role);
  const followListStore = useSelector(state => state.follow.followListStore);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const loading = useSelector(state => state.file.loading);

  const handlerUploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
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
      setCover(result.uri);
      dispatch(uploadCover(result.uri, profile, null));
    }
  };

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(listStoreFollowAction());
    });
    return focus;
  }, [dispatch]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      if (
        profile.avatar === null ||
        profile.cover === null ||
        profile.address === null ||
        profile.bio === null ||
        profile.avatar === null
      ) {
        return navigation.navigate('EditProfile');
      }
    });
    return focus;
  }, [dispatch, navigation]);

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
    <View style={styles.main}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      ) : (
        <View style={{ width: '100%', height: '45%', position: 'relative' }}>
          <View>
            <Image
              source={{ uri: cover === null ? `${profile.cover}` : cover }}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                resizeMode: 'cover',
              }}
            />
            <TouchableOpacity
              style={styles.iconCover}
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
              bottom: '-40%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Avatar.Image
                    style={{
                      borderWidth: 2,
                      borderColor: `${COLORS.purple[4]}`,
                      overflow: 'hidden',
                    }}
                    source={{
                      uri: avatar === null ? `${profile.avatar}` : avatar,
                    }}
                    size={120}
                  />
                  <TouchableOpacity
                    style={styles.iconAvatar}
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
                <Title style={{ fontSize: 22, fontWeight: 'bold' }}>
                  {profile.name}
                </Title>
                <Subheading style={{ fontSize: 18 }}>{profile.bio} </Subheading>
              </View>
              <View style={{ marginTop: 100 }}>
                <Button
                  onPress={() => navigation.navigate('EditPublic', { profile })}
                >
                  Chỉnh sửa
                </Button>
              </View>
            </View>
          </View>
          {store === ROLES.ROLE_USER && (
            <View style={{ marginTop: 140 }}>
              {followListStore.length > 0 && (
                <TouchableOpacity
                  style={styled.item}
                  onPress={() => navigation.navigate('ListStoreScreen')}
                >
                  <FontAwesome5 name="store-alt" size={24} color="black" />
                  <Subheading style={styled.text}>
                    Đang theo dõi {followListStore.length} cửa hàng
                  </Subheading>
                </TouchableOpacity>
              )}
              <Divider />
              {friend.length > 0 ? (
                <TouchableOpacity
                  style={styled.item}
                  onPress={() => navigation.navigate('MainFriendScreen')}
                >
                  <Ionicons name="ios-people" size={24} color="black" />
                  <Subheading style={styled.text}>
                    Đang có {friend.length} bạn bè
                  </Subheading>
                </TouchableOpacity>
              ) : (
                <View style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  <Subheading>Không có bạn bè </Subheading>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styled = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 30,
  },
  text: {
    marginLeft: 10,
  },
});

export default ProfileDetailScreen;
