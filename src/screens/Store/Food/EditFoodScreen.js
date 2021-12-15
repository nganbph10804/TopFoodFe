import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import {
  deleteImageAction,
  multiFileAction,
} from '../../../redux/file/actions/fileAction.js';
import { updateFoodAction } from '../../../redux/store/food/actions/foodAction.js';
import { InputUpdate, styles } from '../../../styles/paper.js';

const EditFoodScreen = ({ route, navigation }) => {
  const { content, files, id, name, price, tag } = route.params;
  const file = useSelector(state => state.file.files);
  const loadingFile = useSelector(state => state.file.loading);
  const [newContent, setNewContent] = useState(content);
  const [newName, setName] = useState(name);
  const [newPrice, setPrice] = useState(price);
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
    file.map(i => files.push(i));
    if (
      newContent.trim().length < 1 &&
      newName.trim().length < 1 &&
      newPrice.trim().length < 1
    ) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống',
      });
    } else {
      dispatch(
        updateFoodAction(
          newContent,
          files,
          id,
          newName,
          newPrice,
          tag.id,
          navigation
        )
      );
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
    <Card>
      <ScrollView style={{ width: '100%', height: '100%', marginTop: 20 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
          <Button
            mode="contained"
            color={COLORS.blue[1]}
            onPress={() => handlerCreate()}
          >
            Cập nhật món ăn
          </Button>
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
                </View>
              )}
              {files.length < 1 ? (
                <Text></Text>
              ) : (
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                  {files.map((i, index) => (
                    <Image
                      key={index}
                      source={{ uri: i }}
                      style={{ width: 70, height: 70, margin: 5 }}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Entypo name="price-tag" size={24} color={`${COLORS.blue[1]}`} />
            <Subheading style={{ paddingLeft: 10 }}>
              Tag món ăn: #{tag.tagName}
            </Subheading>
          </View>
        </View>
        <View style={{ position: 'relative' }}>
          <InputUpdate
            outlineColor={`${COLORS.blue[4]}`}
            mode="outlined"
            label="Tên món ăn"
            value={newName}
            onChangeText={newName => setName(newName)}
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
            keyboardType="numeric"
            value={newPrice.toString()}
            onChangeText={newPrice => setPrice(newPrice)}
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

const styled = StyleSheet.create({
  viewBtn: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
export default EditFoodScreen;
