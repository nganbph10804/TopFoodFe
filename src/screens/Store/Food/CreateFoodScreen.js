import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Picker, ScrollView, Text, View } from 'react-native';
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
import { multiFileAction } from '../../../redux/file/actions/fileAction.js';
import { createFoodAction } from '../../../redux/store/food/actions/foodAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import { InputUpdate, styles } from '../../../styles/paper.js';
import { styled } from '../../../styles/store.js';

const CreateFoodScreen = ({ navigation }) => {
  const { tag } = useSelector(state => state.tag);
  const file = useSelector(state => state.file.files);
  const loadingFile = useSelector(state => state.file.loading);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tagList, setTagList] = useState('');
  const [pickerValue, setPickerValue] = useState('');
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
    if (file.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải upload ảnh',
      });
    } else if (
      content.trim().length < 1 &&
      name.trim().length < 1 &&
      price.trim().length < 1
    ) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống',
      });
    } else
      dispatch(
        createFoodAction(content, file, name, price, tagList, navigation)
      );
  };

  useEffect(() => {
    dispatch(searchTagAction(''));
  }, [dispatch]);

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
    <Card>
      <ScrollView style={{ width: '100%', height: '100%', marginTop: 20 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Entypo name="images" size={30} color={`${COLORS.blue[1]}`} />
            <Subheading style={{ paddingLeft: 10 }}>Chọn ảnh</Subheading>
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
                Upload
              </Button>
            )}
          </View>
          {loadingFile ? (
            <Text></Text>
          ) : (
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <ScrollView horizontal={true}>
                {file.map((i, index) => (
                  <Image
                    key={index}
                    source={{ uri: i }}
                    style={{ width: 70, height: 70, margin: 5 }}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Entypo name="price-tag" size={24} color={`${COLORS.blue[1]}`} />
            <Subheading style={{ paddingLeft: 10 }}>Tag món ăn</Subheading>
          </View>
          <View style={styles.picker}>
            <Picker
              mode="dialog"
              style={{ width: undefined }}
              selectedValue={pickerValue}
              onValueChange={e => [setPickerValue(e), setTagList(e)]}
            >
              <Picker.Item label="Chọn tag" />
              {tag.map(c => (
                <Picker.Item key={c.id} label={c.tagName} value={c.id} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ position: 'relative' }}>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
            mode="outlined"
            label="Tên món ăn"
            value={name}
            onChangeText={name => setName(name)}
            left={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="person"
                    size={24}
                    color={`${COLORS.blue[1]}`}
                  />
                )}
              />
            }
          />
        </View>
        <View style={{ position: 'relative', paddingTop: 20 }}>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
            mode="outlined"
            label="Giá tiền"
            value={price}
            keyboardType="numeric"
            onChangeText={price => setPrice(price)}
            left={
              <TextInput.Icon
                name={() => (
                  <FontAwesome5
                    name="money-bill-wave"
                    size={24}
                    color={`${COLORS.blue[1]}`}
                  />
                )}
              />
            }
          />
        </View>
        <View style={{ position: 'relative', paddingTop: 20 }}>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
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
                    color={`${COLORS.blue[1]}`}
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
            onPress={() => handlerCreate()}
          >
            Tạo món ăn
          </Button>
        </View>
      </ScrollView>
    </Card>
  );
};

export default CreateFoodScreen;
