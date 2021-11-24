import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { _ } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Subheading,
  TextInput,
  Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  clearFilesAction,
  multiFileAction,
} from '../../redux/file/actions/fileAction.js';
import {
  commentListAction,
  commentPostAction,
  likeCommentAction,
} from '../../redux/react/actions/reactAction.js';
import ActionComment from './ActionComment.js';
import RemoveComment from './RemoveComment.js';

const Comment = ({ navigation, post, setShow }) => {
  const { id } = post;
  const file = useSelector(state => state.file.files);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const commentList = useSelector(state => state.react.comment);
  const [height, setHeight] = useState();
  const [comment, setComment] = useState('');

  const handlerSend = () => {
    if (file) {
      dispatch(commentPostAction(post.id, comment, file));
      setComment('');
      dispatch(clearFilesAction());
    } else {
      dispatch(commentPostAction(post.id, comment, ''));
      setComment('');
      dispatch(clearFilesAction());
    }
  };

  const likeComment = id => {
    dispatch(likeCommentAction(id, post.id));
  };

  const updateHeight = size => {
    setHeight(size);
  };

  const handlerReply = () => {
    ref.current.focus();
    setReply(true);
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

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      ref.current.focus();
    });
    return focus;
  }, []);

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
    dispatch(commentListAction(id));
    dispatch(clearFilesAction());
  }, [id, dispatch]);

  return (
    <Modal style={{ flex: 1 }}>
      <Button
        onPress={() => setShow(false)}
        style={styled.back}
        icon={() => <AntDesign name="back" size={24} color="black" />}
        color={'#000'}
      >
        Quay lại
      </Button>
      <TouchableOpacity
        style={styled.actionContainer}
        onPress={() => handlerHeart()}
      >
        <Chip
          icon={() => (
            <AntDesign name="like1" size={24} color={`${COLORS.blue[4]}`} />
          )}
          onPress={() => handlerHeart()}
        >
          {post.totalReaction} Likes
        </Chip>
      </TouchableOpacity>
      <ScrollView style={styled.container}>
        <View style={styled.post}>
          <Image
            source={{ uri: `${_.head(post.files)}` }}
            style={{ width: 90, height: 90, borderRadius: 10 }}
          />
          <Subheading
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginLeft: 10 }}
          >
            {post.content}
          </Subheading>
        </View>
        <Divider />
        <View style={styled.title}>
          <Title>Bình luận ({commentList.length})</Title>
          <View>
            {commentList.map((i, idx) => (
              <View key={idx} style={{ paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Avatar.Image
                    source={{ uri: `${i.profile.profile.avatar}` }}
                    size={60}
                  />
                  <Card
                    style={{
                      zIndex: 80,
                      padding: 10,
                      backgroundColor: '#f5f5f5',
                      marginLeft: 5,
                      width: '83%',
                    }}
                  >
                    <Subheading style={{ fontWeight: 'bold' }}>
                      {i.profile.profile.name}
                    </Subheading>
                    <Subheading>{i.content} </Subheading>
                    {i.files &&
                      i.files.map((i, idx) => (
                        <Image
                          key={idx}
                          source={{ uri: `${i.path}` }}
                          style={{
                            width: '100%',
                            height: 200,
                            marginVertical: 5,
                            borderRadius: 10,
                          }}
                        />
                      ))}
                    <RemoveComment />
                  </Card>
                </View>
                <ActionComment
                  i={i}
                  likeComment={likeComment}
                  handlerReply={handlerReply}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styled.viewInput}>
        <View style={{ marginLeft: 20, flexDirection: 'row', marginTop: 10 }}>
          {file &&
            file.map((i, idx) => (
              <View key={idx} style={{ marginHorizontal: 5 }}>
                <Image
                  source={{ uri: `${i}` }}
                  style={{ width: 60, height: 60, borderRadius: 10 }}
                />
              </View>
            ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo
            name="images"
            size={24}
            color={`${COLORS.blue[4]}`}
            onPress={() => handlerUpload()}
          />
          <TextInput
            ref={ref}
            mode="outlined"
            value={comment}
            onChangeText={comment => setComment(comment)}
            outlineColor={`${COLORS.blue[4]}`}
            selectionColor={`${COLORS.blue[4]}`}
            placeholder="Nội dung"
            onContentSizeChange={e =>
              updateHeight(e.nativeEvent.contentSize.height)
            }
            multiline={true}
            style={styled.input}
            autoFocus={true}
            right={<TextInput.Affix text={`${comment.length}/1000`} />}
          />
          <Ionicons
            name="send"
            size={24}
            color={`${COLORS.blue[4]}`}
            onPress={() => handlerSend()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
  },
  back: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  comment: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  viewInput: {
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '79%',
    marginHorizontal: 10,
  },
  post: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 10,
    marginBottom: 100,
  },
  action: {
    position: 'absolute',
    bottom: -40,
    left: 100,
    flexDirection: 'row',
  },
  actionContainer: {
    position: 'absolute',
    right: 30,
    top: 10,
  },
});

export default Comment;
