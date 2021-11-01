import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View,LogBox } from "react-native";
import { Actions, Bubble, GiftedChat, Send,ActionsProps } from "react-native-gifted-chat";

import fb from './../Firebase/config';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as handlePickImage from 'expo-image-picker'


const db = fb.firestore();
const chatsRef = db.collection('chats');
const roomRef = db.collection('Rooms');
LogBox.ignoreAllLogs();

const ChatScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([]);
  const { _id, avt, uname, idRoom } = route.params;


  useEffect(() => {
    setUser({
      _id: _id,
      name: uname,
      avatar: avt,
    })
    const unsubscribe = chatsRef.where("idRoom", "==", idRoom).onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type == 'added')
        .map(({ doc }) => {
          const message = doc.data()
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => {setMessages([]); unsubscribe()}; 
  }, []); 

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )
  const renderSend = (props) => {
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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  function renderActions(props: Readonly<ActionsProps>) {
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: handlePickImage,
        }}
        icon={() => (
          <Ionicons name='ios-image' size={22} color='blue' />
        )}
        onSend={args => console.log(args)}
      />
    )
  }



  async function handleSend(messages) {
    const writes = messages.map((m) => {
      chatsRef.add({
        ...m,
        "idRoom": idRoom
      })
      roomRef.doc(idRoom).update({
        "lastMessageTime": new Date(),
        "lastMessage": m.text
      })
    })
    await Promise.all(writes)
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => { handleSend(messages) }}
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
