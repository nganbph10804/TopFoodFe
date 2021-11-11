import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Subheading,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { multiFileAction } from '../../../redux/actions/fileAction.js';
import { createFeedAction } from '../../../redux/store/feed/actions/feedAction.js';
import { InputUpdate } from '../../../styles/paper.js';
//<AntDesign name="closecircle" size={24} color="black" />

const CreateFeedScreen = ({ navigation }) => {
  const { files } = useSelector(state => state.file);
  const loadingFile = useSelector(state => state.file.loading);
  const { tag } = useSelector(state => state.tag);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [tagId, setTagId] = useState({ arr: [] });
  const [name, setName] = useState({ arr: [] });

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

  const handlerChecked = item => {
    setTagId(prev => ({
      ...prev,
      arr: [...prev.arr, item.id],
    }));
    setName(prev => ({
      ...prev,
      arr: [...prev.arr, item.tagName],
    }));
  };
  const handlerCreate = () => {
    dispatch(createFeedAction(content, files, tagId.arr, navigation));
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
    <Card style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{ alignSelf: 'flex-start', paddingLeft: 30, marginTop: 20 }}
        >
          <Button
            icon={() => (
              <AntDesign name="cloudupload" size={24} color="white" />
            )}
            mode="contained"
            onPress={handlerCreate}
          >
            Tạo bài viết
          </Button>
        </View>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <ScrollView horizontal={true}>
            {tag.map(i => (
              <Chip
                key={i.id}
                onPress={() => handlerChecked(i)}
                style={{
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                {i.tagName}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Subheading>Tag đã chọn: </Subheading>
          {name &&
            name.arr.map((i, index) => (
              <Subheading key={index}>
                #{i}
                {'\r'}
              </Subheading>
            ))}
        </View>
        <View>
          <InputUpdate
            mode="outlined"
            label="Nội dung"
            placeholder="Nội dung"
            value={content}
            onChangeText={content => setContent(content)}
            multiline={true}
            numberOfLines={8}
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
        {loadingFile ? (
          <View style={{ alignSelf: 'center', marginTop: 15 }}>
            <ActivityIndicator
              animating={true}
              color={`${COLORS.blue[1]}`}
              size={'small'}
            />
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            <View
              style={{
                alignSelf: 'flex-start',
                marginLeft: 20,
                paddingBottom: 10,
              }}
            >
              <Button
                icon={() => (
                  <AntDesign name="cloudupload" size={24} color="white" />
                )}
                mode="contained"
                onPress={handlerUpload}
              >
                Chọn ảnh
              </Button>
            </View>
            {files &&
              files.map((i, index) => (
                <View key={index}>
                  <Image
                    source={{ uri: `${i}` }}
                    style={{ width: '100%', height: 200, marginVertical: 5 }}
                  />
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </Card>
  );
};
export default CreateFeedScreen;
