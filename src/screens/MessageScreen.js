import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ViewBase, Alert } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyle';
import SockJS from 'sockjs-client';
import { useSelector } from 'react-redux';
import Stomp from 'webstomp-client'
import { Ionicons } from '@expo/vector-icons';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';



const MessagesScreen = ({ navigation }) => {

  let urlWs = "http://34.67.241.66:8080/ws/";
  let socket = new SockJS(urlWs);
  var stompClient = Stomp.over(socket);
  
  var stompClientMessage = null;
  var stompClientConversation = null;
  const {  id } = useSelector(
    state => state.auth.profile
  );
  const toTimestamp = (strDate) => {
    let time = strDate.substring(11, 16);
    return time && time;
  }
  function checkResult(body) {
      if (body.status == false) {
          Alert.alert("empty result");
          return false;
      }
      return true;
}
 


  const [cvsName, setCvsName] = useState('');
  const [cvsId, setCvsId] = useState('')
  const [messages, setMessages] = useState([]);
  const [lstMess, setLstMess] = useState([]);
  const [visible, setVisible] = useState(false);

  const clearInput = () => {
    setCvsName('');
    setCvsId('');
  }
  const connect = () => {
    stompClient.connect({}, () => { subcribeConversation(id) }, error => { console.log("error"); });
  }


  const bindingData = (payload) => {
    let body = JSON.parse(payload.body);
    if (body.type == "LIST_CONVERSATION") {
      if (body.status == true) {
        setLstMess(body.data);
      }

    } else if (body.type == "CREATE_CONVERSATION") {
      if (body.status == true) {
        setLstMess(body.data);
      }
    }else if(body.type == 'LIST_MESSAGE') {
      if (body.status == true) {
        setMessages(body.data);
      }
    }
  }
  const onOpenChat = (item) => {
    onOpenMes(item.id);
    navigation.navigate('Chat', { 
      userName: item.title,
      lst: messages
     })
  }
  const onOpenMes = (idConversation) => {
    if (stompClientMessage != null) {
      stompClient.unsubscribe(stompClientMessage.id);
    }
    
    stompClientMessage = stompClient.subscribe(`/messages/inbox/messages_${idConversation}`, (payload) => bindingData(payload));
    let objSend = {
      "accountId": id,
      "conversationId": idConversation,
      "page": 0,
      "pageSize": 10,
      "order": "DESC",
      "orderBy": "id"
    };
    stompClient.send(`/app/conversation_${id}/info-conversation`, JSON.stringify({objSend}), {}); // info-conversation chỉ cần accountId, conversationId
    stompClient.send(`/app/messages_${idConversation}/get-list-message`, JSON.stringify(objSend), {});
}

  function subcribeConversation(idAccount) {
    if (stompClientConversation != null) {
      stompClient.unsubscribe(stompClientConversation.id);
    }
    stompClientConversation = stompClient.subscribe(`/messages/inbox/conversation_${idAccount}`, (payload) => bindingData(payload));
    let objSend = {
      "accountId": idAccount,
      "conversationId": "",
      "page": 0,
      "pageSize": 10,
      "order": "DESC",
      "orderBy": "updateAt"
    };
    stompClient.send(`/app/conversation_${idAccount}/get-list-conversation`, JSON.stringify(objSend), {});
  }


  const onCreateMess = () => {

    let objSend = {
      "accountId": id,
      "conversationId": "",
      "name": cvsName,
      "accountIdAdd": cvsId
    };
    stompClient.send(`/app/conversation_${id}/create-conversation`, JSON.stringify(objSend), {});
    hideDialog();
    clearInput();
    subcribeConversation(id);
  }
  useEffect(() => {
    connect();
    return () => {
      // stompClient && stompClient.disconnect();
    }
  }, [stompClientConversation]);

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <Container>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Create New Conversation</Dialog.Title>
            <Dialog.Content>
              <Paragraph>name</Paragraph>
              <TextInput
                value={cvsName}
                onChangeText={setCvsName}
                style={styles.inputt}
              />
              <Paragraph>ID</Paragraph>
              <TextInput
                value={cvsId}
                onChangeText={setCvsId}
                style={styles.inputt}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={() => { onCreateMess() }}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.container}>
          <Searchbar style={styles.searchBarr}
            inputStyle={{
              fontSize: 16,
              paddingVertical: 5
            }}
            placeholder="Search"
          />

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => {
              setVisible(true)
            }}
          >
            <Ionicons
              name="ios-create-outline"
              size={23}
              style={{
                paddingRight: 15,
              }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={lstMess}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card onPress={() => onOpenChat(item)}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{ uri: item.createBy.avatar }} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.title}</UserName>
                    <PostTime>{toTimestamp(item.createAt)}</PostTime>
                  </UserInfoText>
                  <MessageText>{`Touch to open Message`}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </Provider>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchBarr: {
    marginVertical: 10,
    borderRadius: 20,
    marginLeft: 15,
    elevation: 0,
    backgroundColor: '#ebebebeb',
    height: 33,
    width: '90%'
  },
  createBtn: {
    justifyContent: 'center',
    marginLeft: 15
  },
  inputt: {
    height: 30,
  }
});
