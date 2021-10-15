import React, {useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
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
import { useSelector} from 'react-redux';
import Stomp from 'webstomp-client'


const ListMessages = [];

const MessagesScreen = ({ navigation }) => {
    const { cover, avatar, address, birthday, bio, name, id } = useSelector(
        state => state.auth.profile
      );
      const [messages, setMessages] = useState([]);
      var stompClient = null;
      var stompClientConversation = null;

      const bindingData = (payload) =>{
        let body = JSON.parse(payload.body);
        Alert.alert(body.data[0].id);
        // if (body.type == "LIST_CONVERSATION") {
        //     if (body.status == true) {
        //        ListMessages = body.data
        //     } 
        // }
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
    
      const connect = () => {
        let urlWs = "http://34.67.241.66:8080/ws/";
        let socket = new SockJS(urlWs);
        stompClient = Stomp.over(socket);
        stompClient.connect({},() => {subcribeConversation(id)},error => {console.log(error);});
      }
      useEffect(() => {
        connect();
        return ()=>{
            stompClient && stompClient.disconnect();
        }
      }, [id]);

    return (
        <Container>
            <Searchbar style={{
                marginVertical: 10,
                borderRadius: 20,
                elevation: 0,
                backgroundColor: '#ebebebeb',
                height: 33,

            }}
                inputStyle={{
                    fontSize: 16,
                    paddingVertical: 5
                }}
                placeholder="Search"
            />
            <FlatList
                data={ListMessages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { userName: item.title })}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{ uri: item.createBy.avatar }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.createBy.name}</UserName>
                                    <PostTime>{item.updateAt}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.createBy.name}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});