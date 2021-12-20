import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { _ } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Subheading,
  TextInput,
  Chip,
  Title,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { createFeedAction } from '../../../redux/feed/feedAction.js';
import { multiFileAction } from '../../../redux/file/actions/fileAction.js';
import { InputUpdate } from '../../../styles/paper.js';

const CreateFeedScreen = ({ navigation }) => {
  const { files } = useSelector(state => state.file);
  const food = useSelector(state => state.food.food);
  const loadingFile = useSelector(state => state.file.loading);
  const { tag } = useSelector(state => state.tag);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [data, setData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [tagSelected, setTagSelected] = useState([]);
  const [foodSelected, setFoodSelected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const handlerSelected = id => {
    let arr = data.map((i, idx) => {
      if (i.id === id) {
        i.isSelected = !i.isSelected;
      }
      return { ...i };
    });
    setData(arr);
  };

  const handlerChecked = id => {
    let arr = tagData.map((i, idx) => {
      if (i.id === id) {
        i.isSelected = !i.isSelected;
      }
      return { ...i };
    });
    setTagData(arr);
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

  const handlerCreate = () => {
    if (content.trim().length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống nội dung',
      });
    } else if (tagSelected.length > 4) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Chỉ được chọn tối đa 4 Hash Tag',
      });
    } else if (tagSelected.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải chọn tối thiểu 1 Hash Tag',
      });
    } else if (foodSelected.length > 4) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Chỉ được chọn tối đa 4 Món ăn',
      });
    } else if (foodSelected.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải chọn tối thiểu 1 Món ăn',
      });
    } else if (files.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Phải chọn tối thiểu 1 ảnh',
      });
    } else {
      dispatch(
        createFeedAction(
          content,
          files,
          _.map(foodSelected, 'id'),
          _.map(tagSelected, 'id'),
          navigation
        )
      );
    }
  };

  useEffect(() => {
    let arr1 = food.map(i => {
      i.isSelected = false;
      return { ...i };
    });
    let arr2 = tag.map(i => {
      i.isSelected = false;
      return { ...i };
    });
    setTagData(arr2);
    setData(arr1);
  }, []);

  useEffect(() => {
    let arr1 = _.filter(data, 'isSelected');
    setFoodSelected(arr1);
  }, [data]);

  useEffect(() => {
    let arr2 = _.filter(tagData, 'isSelected');
    setTagSelected(arr2);
  }, [tagData]);

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
    <View style={{ flex: 1, zIndex: -10 }}>
      {visible && (
        <Modal>
          <Button onPress={() => setVisible(false)}>Đóng</Button>
          <ScrollView>
            {data.map((i, index) => (
              <TouchableOpacity
                style={styled.main}
                onPress={() => handlerSelected(i.id)}
                key={index}
                style={styled.food}
              >
                <Checkbox status={i.isSelected ? 'checked' : 'unchecked'} />
                <Image
                  source={{ uri: _.head(i.files) }}
                  style={{ width: 80, height: 80, marginRight: 10 }}
                />
                <Subheading>{i.name}</Subheading>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      )}
      {show && (
        <Modal>
          <Button onPress={() => setShow(false)}>Đóng</Button>
          <ScrollView>
            {tagData.map((i, index) => (
              <TouchableOpacity
                style={styled.main}
                onPress={() => handlerChecked(i.id)}
                key={index}
                style={styled.food}
              >
                <Checkbox status={i.isSelected ? 'checked' : 'unchecked'} />
                <Subheading style={{ fontWeight: 'bold' }}>
                  #{i.tagName}
                </Subheading>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      )}
      <ScrollView>
        <View style={styled.title}>
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
        <View style={styled.item}>
          <Button onPress={() => setShow(true)}>Chọn tag đính kèm</Button>
          <ScrollView horizontal={true}>
            {tagSelected.map((i, idx) => (
              <View
                key={idx}
                style={{
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Subheading
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      paddingLeft: 10,
                    }}
                  >
                    #{i.tagName}
                  </Subheading>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <Subheading style={{ marginLeft: 20 }}>Nội dung bài viết</Subheading>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
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
        <View style={styled.item}>
          <Button onPress={() => setVisible(true)}>Chọn món ăn đính kèm</Button>
          <ScrollView horizontal={true}>
            {foodSelected.map((i, idx) => (
              <View
                key={idx}
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  marginLeft: 15,
                }}
              >
                <Image
                  source={{ uri: `${_.head(i.files)}` }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <Subheading>{i.name}</Subheading>
              </View>
            ))}
          </ScrollView>
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
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  food: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 20,
  },
  item: {
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  title: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    marginTop: 20,
  },
  active: {
    backgroundColor: `${COLORS.blue[1]}`,
    color: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
export default CreateFeedScreen;
