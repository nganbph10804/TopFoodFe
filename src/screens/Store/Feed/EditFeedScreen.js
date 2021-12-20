import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Subheading,
  TextInput,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { updateFeedAction } from '../../../redux/feed/feedAction.js';
import {
  clearFilesAction,
  deleteImageAction,
  multiFileAction,
} from '../../../redux/file/actions/fileAction.js';
import { InputUpdate } from '../../../styles/paper.js';
import { _ } from 'lodash';

const EditFeedScreen = ({ route, navigation }) => {
  const { content, files, id, tags, foods } = route.params;
  const file = useSelector(state => state.file.files);
  const loadingFile = useSelector(state => state.file.loading);
  const [newContent, setNewContent] = useState(content);
  const [image, setImage] = useState(files);
  const dispatch = useDispatch();

  const totalImg = [...image, ...file];

  const remove = item => {
    const img = image.filter(i => i !== item);
    setImage(img);
  };

  const removeImage = item => {
    dispatch(deleteImageAction(item));
  };

  const handlerUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      dispatch(multiFileAction(result.uri));
    }
  };

  const handlerUpdate = () => {
    file.map(i => files.push(i));
    if (newContent.trim().length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống',
      });
    } else if (totalImg.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải có it nhất 1 ảnh',
      });
    } else if (totalImg.length > 4) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Chỉ upload tối đa 4 ảnh',
      });
    } else {
      Alert.alert('Thông báo', 'Bạn có muốn đăng xuất không?', [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(
              updateFeedAction(
                newContent,
                totalImg,
                _.map(foods, 'id'),
                id,
                _.map(tags, 'id'),
                navigation
              )
            );
          },
        },
      ]);
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

  useEffect(() => {
    dispatch(clearFilesAction());
  }, [dispatch]);

  return (
    <Card>
      <ScrollView style={{ width: '100%', height: '100%', marginTop: 20 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
          <View style={{ alignItems: 'center' }}>
            <Button
              mode="contained"
              color={COLORS.blue[1]}
              onPress={() => handlerUpdate()}
              icon={() => (
                <MaterialIcons name="update" size={24} color="white" />
              )}
            >
              Cập nhật bài viết
            </Button>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'center',
              paddingTop: 15,
              paddingLeft: 10,
            }}
          >
            {loadingFile ? (
              <View style={{ alignSelf: 'center', marginTop: 15 }}>
                <ActivityIndicator
                  animating={true}
                  color={`${COLORS.blue[1]}`}
                  size={'small'}
                />
              </View>
            ) : (
              <Button
                icon={() => (
                  <FontAwesome name="cloud-upload" size={24} color="#fff" />
                )}
                mode="contained"
                onPress={() => handlerUpload()}
              >
                Upload Ảnh
              </Button>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <ScrollView horizontal={true}>
              {loadingFile ? (
                <Text></Text>
              ) : (
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                  {file.map((i, index) => (
                    <View key={index} style={{ padding: 10 }}>
                      <Image
                        source={{ uri: i }}
                        style={{
                          width: 90,
                          height: 90,
                          margin: 15,
                          borderRadius: 10,
                        }}
                      />
                      <MaterialIcons
                        name="highlight-remove"
                        size={30}
                        color="red"
                        style={{ position: 'absolute', top: 5, right: 0 }}
                        onPress={() => removeImage(i)}
                      />
                    </View>
                  ))}
                </View>
              )}
              {image.length < 0 ? (
                <Text></Text>
              ) : (
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                  {image.map((i, index) => (
                    <View key={index} style={{ padding: 10 }}>
                      <Image
                        source={{ uri: i }}
                        style={{
                          width: 90,
                          height: 90,
                          margin: 15,
                          borderRadius: 10,
                        }}
                      />
                      <MaterialIcons
                        name="highlight-remove"
                        size={30}
                        color="red"
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onPress={() => remove(i)}
                      />
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginLeft: 20,
            marginBottom: 10,
          }}
        >
          <Entypo name="price-tag" size={24} color={`#000`} />
          <Subheading
            style={{
              paddingLeft: 10,
              color: '#000',
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 18,
            }}
          >
            Hash Tag món ăn:{' '}
          </Subheading>
          {tags.map(i => (
            <Subheading
              key={i.id}
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 18,
              }}
            >
              #{i.tagName}{' '}
            </Subheading>
          ))}
        </View>
        <View>
          <ScrollView
            horizontal={true}
            style={{ marginHorizontal: 30, marginBottom: 20 }}
          >
            {foods.map((i, idx) => (
              <View
                key={idx}
                style={{
                  padding: 5,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: `${_.head(i.files)}` }}
                  style={{ width: 80, height: 80 }}
                />
                <Subheading>{i.name}</Subheading>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ position: 'relative', marginTop: -10 }}>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
            mode="outlined"
            label="Nội dung"
            value={newContent}
            onChangeText={newContent => setNewContent(newContent)}
            multiline={true}
            numberOfLines={5}
            left={
              <TextInput.Icon
                name={() => (
                  <MaterialCommunityIcons
                    name="file-edit-outline"
                    size={24}
                    color={`${COLORS.blue[1]}`}
                  />
                )}
              />
            }
          />
        </View>
      </ScrollView>
    </Card>
  );
};

export default EditFeedScreen;
