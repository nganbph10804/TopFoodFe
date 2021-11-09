import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Subheading, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import { InputUpdate } from '../../../styles/paper.js';

const CreateFeedScreen = () => {
  const { tag } = useSelector(state => state.tag);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);
  const [content, setContent] = useState('');

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
      <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
        <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
          {tag.map(i => (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              key={i.id}
            >
              <Subheading>{i.tagName}</Subheading>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    </Card>
  );
};
const styled = StyleSheet.create({});
export default CreateFeedScreen;
