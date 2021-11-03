import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useState } from 'react';
import { Picker, ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Subheading,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { multiFileAction } from '../../../redux/actions/fileAction.js';
import { createFoodAction } from '../../../redux/store/food/actions/foodAction.js';
import { tagListAction } from '../../../redux/store/tag/action/tagAction.js';
import { InputUpdate, styles } from '../../../styles/paper.js';
import { styled } from '../../../styles/store.js';

const CreateFoodScreen = ({ navigation }) => {
  const { tag } = useSelector(state => state.tag);
  const file = useSelector(state => state.file.files);
  const loading = useSelector(state => state.tag.loading);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [tagList, setTagList] = useState();
  const dispatch = useDispatch();

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

  const handlerCreate = () => {
    dispatch(createFoodAction(content, file, name, price, tagList, navigation));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(tagListAction());
    }, [dispatch])
  );
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
    <ScrollView style={{ width: '100%', height: '100%' }}>
      <View style={styled.main}>
        {/* {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )} */}
        <View style={styles.card}>
          <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
            <Subheading style={{ paddingLeft: 10 }}>Chọn ảnh</Subheading>
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'center',
                paddingTop: 15,
                paddingLeft: 10,
              }}
            >
              <Button
                icon={() => (
                  <FontAwesome name="cloud-upload" size={24} color="#fff" />
                )}
                mode="contained"
                onPress={() => handlerUpload()}
              >
                Upload
              </Button>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              {loading && (
                <View style={{ zIndex: 10 }}>
                  <ActivityIndicator
                    animating={true}
                    color={`${COLORS.blue[1]}`}
                    size={'large'}
                  />
                </View>
              )}
              {/* {file.map((i, index) => (
                <Image
                  key={index}
                  source={{ uri: i }}
                  style={{ width: 70, height: 70, margin: 5 }}
                />
              ))} */}
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
            <Subheading style={{ paddingLeft: 10 }}>Chọn Tag</Subheading>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: `#696666`,
              }}
            >
              <Picker
                mode="dialog"
                selectedValue={tagList}
                style={{
                  width: undefined,
                  color: `#000`,
                }}
                onValueChange={e => [setTagList(e)]}
              >
                {tag.map(i => (
                  <Picker.Item key={i.id} label={i.tagName} value={i.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ position: 'relative', paddingTop: 10 }}>
            <InputUpdate
              mode="outlined"
              label="Tên món ăn"
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
              label="Giá tiền"
              value={price}
              onChangeText={price => setPrice(price)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Entypo name="price-tag" size={24} color="black" />
                  )}
                />
              }
            />
          </View>
          <View style={{ position: 'relative', paddingTop: 20 }}>
            <InputUpdate
              mode="outlined"
              label="Mô tả"
              value={content}
              onChangeText={content => setContent(content)}
              multiline={true}
              numberOfLines={5}
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
          <View style={styled.viewBtn}>
            <Button
              mode="contained"
              color={COLORS.blue[1]}
              onPress={handlerCreate}
            >
              Tạo món ăn
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateFoodScreen;
