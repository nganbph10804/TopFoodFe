import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
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


const Messages = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: 'https://genk.mediacdn.vn/2017/a-2-1489899621733.png',
        messageTime: '4 mins ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: 'https://genk.mediacdn.vn/2017/a-2-1489899621733.png',
        messageTime: '2 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: 'https://genk.mediacdn.vn/2017/a-2-1489899621733.png',
        messageTime: '1 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: 'https://genk.mediacdn.vn/2017/a-2-1489899621733.png',
        messageTime: '1 day ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: 'https://genk.mediacdn.vn/2017/a-2-1489899621733.png',
        messageTime: '2 days ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
];

const MessagesScreen = ({ navigation }) => {
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
                data={Messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{ uri: item.userImg }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.userName}</UserName>
                                    <PostTime>{item.messageTime}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messageText}</MessageText>
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