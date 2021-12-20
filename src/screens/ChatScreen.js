import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import * as handlePickImage from 'expo-image-picker';
import mime from 'mime';
import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { Actions, Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import Toast from 'react-native-toast-message';
import fb from './../Firebase/config';
import deviceStorage from './../redux/deviceStorage ';

const db = fb.firestore();
const chatsRef = db.collection('chats');
const roomRef = db.collection('Rooms');

const ChatScreen = ({ navigation, route }) => {
  LogBox.ignoreAllLogs();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { _id, avt, uname, idRoom } = route.params;

  useEffect(() => {
    setUser({
      _id: _id,
      name: uname,
      avatar: avt,
    });
    const unsubscribe = chatsRef
      .where('idRoom', '==', idRoom)
      .onSnapshot(querySnapshot => {
        const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type == 'added')
          .map(({ doc }) => {
            const message = doc.data();
            return { ...message, createdAt: message.createdAt.toDate() };
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        appendMessages(messagesFirestore);
      });
    return () => {
      setMessages([]);
      unsubscribe();
    };
  }, []);

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  async function uploadFile(file) {
    try {
      let formData = new FormData();
      formData.append('file', {
        uri: file,
        type: mime.getType(file),
        name: file.split('/').pop(),
      });
      const token = await deviceStorage.loadJWT();
      const { data } = await axios.post(
        'http://58.84.1.32:8080/files/uploads',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return 'http://58.84.1.32:8080' + data.data.map(i => i.path);
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error.response.data.message,
      });
    }
  }

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: async () => {
            let result = await handlePickImage.launchImageLibraryAsync({
              mediaTypes: handlePickImage.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            const path = await uploadFile(result.uri);
            const message = {
              _id: (Math.random() + 1).toString(36).substring(2),
              image: path,
              messageType: 'image',
              createdAt: new Date(),
              idRoom: idRoom,
              user: user,
            };
            if (!result.cancelled) {
              chatsRef.add(message);
              roomRef.doc(idRoom).update({
                lastMessageTime: new Date(),
                lastMessage: uname + ` đã gửi 1 ảnh.`,
              });
              useCallback(
                messages => {
                  GiftedChat.append(messages);
                },
                [messages]
              );
            }
          },
        }}
        icon={() => <Ionicons name="ios-image" size={22} color="blue" />}
      />
    );
  }
  const onDelete = messageIdToDelete => {
    let batch = db.batch();
    const deletequery = chatsRef.where('_id', '==', messageIdToDelete);
    deletequery.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    });
    setMessages(previousState =>
      previousState.filter(message => message._id !== messageIdToDelete)
    );
    roomRef.doc(idRoom).update({
      lastMessageTime: new Date(),
      lastMessage: uname + ` đã xóa 1 tin nhắn`,
    });
    Toast.show({
      type: 'success',
      topOffset: 40,
      text1: 'Thông báo',
      text2: 'Đã xóa tin nhắn',
    });
  };

  const onLongPress = (context, message) => {
    const options = ['Coppy', 'Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            if (message.tex !== null) {
              Clipboard.setString(message.text);
            }
            Toast.show({
              type: 'success',
              topOffset: 40,
              text1: 'Thông báo',
              text2: 'Đã coppy vào bộ nhớ tạm',
            });
            break;
          case 1:
            if (message.user._id == _id) {
              onDelete(message._id);
            } else {
              Toast.show({
                type: 'error',
                topOffset: 40,
                text1: 'Thông báo',
                text2: 'Bạn không có quyền xóa tin nhắn này!',
              });
            }
            break;
          case 2:
            break;
        }
      }
    );
  };

  async function handleSend(messages) {
    const writes = messages.map(m => {
      chatsRef.add({
        ...m,
        idRoom: idRoom,
      });
      roomRef.doc(idRoom).update({
        lastMessageTime: new Date(),
        lastMessage: m.text,
      });
    });
    await Promise.all(writes);
  }

  return (
    <GiftedChat
      onLongPress={onLongPress}
      messages={messages}
      onSend={messages => {
        handleSend(messages);
      }}
      user={user}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderActions={renderActions}
    />
  );
};

export default ChatScreen;
