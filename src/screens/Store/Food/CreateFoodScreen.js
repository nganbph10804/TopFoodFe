import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { _ } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Checkbox,
  Subheading,
  TextInput,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import {
  deleteImageAction,
  multiFileAction,
} from '../../../redux/file/actions/fileAction.js';
import { createFoodAction } from '../../../redux/store/food/actions/foodAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import { InputUpdate, styles } from '../../../styles/paper.js';

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

  const removeImage = item => {
    dispatch(deleteImageAction(item));
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
    } else if (price < 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Giá món ăn phải lớn hơn 0đ',
      });
    } else if (!tagList) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải chọn tối thiểu 1 Hash Tag',
      });
    } else
      Alert.alert('Thông báo', 'Bạn có muốn thêm món ăn không?', [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            dispatch(
              createFoodAction(content, file, name, price, tagList, navigation)
            );
          },
        },
      ]);
  };

  useEffect(() => {
    dispatch(searchTagAction());
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
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
          <Button
            mode="contained"
            color={COLORS.blue[1]}
            onPress={() => handlerCreate()}
          >
            Tạo món ăn
          </Button>
          <View style={styled.file}>
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
          {loadingFile ? (
            <Text></Text>
          ) : (
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <ScrollView horizontal={true}>
                {file.map((i, index) => (
                  <View key={index} style={{ padding: 10 }}>
                    <Image
                      source={{ uri: i }}
                      style={{
                        width: 165,
                        height: 165,
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
              </ScrollView>
            </View>
          )}
        </View>
        <View
          style={{ paddingHorizontal: 20, marginBottom: 15, marginTop: 10 }}
        >
          <View style={styles.picker}>
            <Picker
              mode="dialog"
              style={{ width: undefined }}
              selectedValue={pickerValue}
              onValueChange={e => [setPickerValue(e), setTagList(e)]}
            >
              <Picker.Item label="Chọn Hash tag" />
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
        <View style={{ position: 'relative', marginTop: 20 }}>
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
        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </Card>
  );
};

const styled = StyleSheet.create({
  file: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingTop: 15,
    paddingLeft: 10,
  },
  hashTag: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  tag: {
    flexDirection: 'row',
    marginLeft: 40,
  },
  tagName: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginHorizontal: 10,
  },
});

export default CreateFoodScreen;
