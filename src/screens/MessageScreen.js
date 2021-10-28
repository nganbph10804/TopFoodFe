import React, { useState,useEffect } from "react";
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
import fb from './../Firebase/config';

const db = fb.firestore()
const RoomsRef = db.collection('Rooms')

const MessagesScreen = ({ navigation }) => {
  const { id, avatar,name } = useSelector(state => state.auth.profile)
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [cvsName, setCvsName] = useState('');
  const [cvsId, setCvsId] = useState('');
  const [lstRoom, setLstRoom] = useState([]);


  function toDateTime(secs) {
   let hours = Number(new Date(secs * 1000).toISOString().substr(12, 1))+7;
   let minute = new Date(secs * 1000).toISOString().substr(14, 2);
   let day = new Date(secs * 1000).toISOString().substr(0, 10);
    
    return `${day} | ${hours}:${minute}`;
}

  //.orderBy('lastMessageTime')
  useEffect(()=>{
     const querySnapshot = RoomsRef.where("userId", "array-contains", `${id}`)
     querySnapshot.onSnapshot(snap =>{
       const data = [
         ...snap.docs.map(doc=>{
           return {...doc.data(),id:doc.id}
         })
       ]
      setLstRoom(data);
     })

    return ()=> {setLstRoom([])}

    

  },[id])

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
          data={lstRoom}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate("Chat", {
                  userName: item.nameRoom,
                  _id: id,
                  avt: avatar,
                  uname : name,
                  idRoom : item.id
                })
              }
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{ uri: item.imgRoom }} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.nameRoom}</UserName>
                    <PostTime>{toDateTime(item.lastMessageTime.seconds)}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.lastMessage}</MessageText>
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
