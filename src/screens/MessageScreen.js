import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
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
import { useSelector } from 'react-redux';
import Stomp from 'webstomp-client'
import { Ionicons } from '@expo/vector-icons';



const MessagesScreen = ({ navigation }) => {
    const { cover, avatar, address, birthday, bio, name, id } = useSelector(
        state => state.auth.profile
    );
    const toTimestamp = (strDate) => {
        let time = strDate.substring(11, 16);
        return time && time;
    }



    const [messages, setMessages] = useState([]);
    const [lstMess, setLstMess] = useState([]);
    var stompClient = null;
    var stompClientConversation = null;

    const bindingData = (payload) => {
        let body = JSON.parse(payload.body);
        if (body.type == "LIST_CONVERSATION") {
            if (body.status == true) {
                setLstMess(body.data);
            }

        }
    }
    const onOpenChat = (item) => {
        navigation.navigate('Chat', { userName: item.title })
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
        stompClient.connect({}, () => { subcribeConversation(id) }, error => { console.log(error); });
    }
    useEffect(() => {
        connect();
        return () => {
            stompClient && stompClient.disconnect();
        }
    }, [id]);

    return (
        <Container>
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => onOpenChat(item)}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{ uri: item.createBy.avatar }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.title}</UserName>
                                    <PostTime>{toTimestamp(item.createBy.updateAt)}</PostTime>
                                </UserInfoText>
                                <MessageText>{`Touch to open Message`}</MessageText>
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
        display:'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    searchBarr: {
        marginVertical: 10,
        borderRadius: 20,
        elevation: 0,
        backgroundColor: '#ebebebeb',
        height: 33,
        width:'90%'
    },
    createBtn:{
        marginLeft:20
    }
});