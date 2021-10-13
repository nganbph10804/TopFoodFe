import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SockJS from 'sockjs-client';
import { useSelector, useDispatch } from 'react-redux';
import Stomp from 'webstomp-client'

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { cover, avatar, address, birthday, bio, name, id } = useSelector(
    state => state.auth.profile
  );
  const [messages, setMessages] = useState([]);
  var stompClient = null;

  function logMessage(payload) {
    console.log(payload.body+"deo co gi ca")
    // let body = JSON.parse(payload.body);
    // if (body.type == "LIST_MESSAGE" && body.status == true) {
    //     body.data.forEach(element => {
    //         let id = element.id;
    //         let name = element.createBy.name;
    //         let content = element.message;
    //         let quote = "";
    //         if (element.quoteMessage != null) {
    //             quote = `(${element.quoteMessage.createBy.name}: ${element.quoteMessage.message})`;
    //         }
    //        console.log(id,name,content)
    //     });
    // }
}
const  send = ()=> {
  let send_message = 'hello !';
  if (stompClient && stompClient.connected) {
    const msg = { name: send_message };
    stompClient.send("/app/hello", JSON.stringify(msg), {});
  }
}

  const connect = () => {
    let urlWs= "http://34.67.241.66:8080/ws/";
    let socket = new SockJS(urlWs);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      frame => {
        stompClient.subscribe(`/messages/inbox/user_${id}`, (payload) => logMessage(payload));
      },
      error => {
        console.log(error+"loi con me no roi");
      }
    );

  }
  useEffect(() => {
    connect();
 
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </KeyboardAvoidingView>

  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});