import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, LogBox, TouchableOpacity } from "react-native";
import { Button, Paragraph, Dialog, Portal, Provider, Searchbar, TextInput } from 'react-native-paper';
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
} from "../styles/MessageStyle";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";


const Messages = [
  {
    id: "1",
    userName: "Nhóm chăn rau cấp 3",
    userImg: "https://genk.mediacdn.vn/2017/a-2-1489899621733.png",
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: "https://genk.mediacdn.vn/2017/a-2-1489899621733.png",
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },

];


const MessagesScreen = ({ navigation }) => {
  const { id, avatar,name } = useSelector(state => state.auth.profile)
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [cvsName, setCvsName] = useState('');
  const [cvsId, setCvsId] = useState('')
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
              <Button onPress={() => { }}>OK</Button>
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
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate("Chat", {
                  userName: item.userName,
                  _id: id,
                  avt: avatar,
                  uname : name
                })
              }
            >
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
