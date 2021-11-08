import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Dialog, Paragraph, Portal, Provider, Searchbar, TextInput } from 'react-native-paper';
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Searchbar,
  TextInput,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/MessageStyle';
import fb from './../Firebase/config';

const db = fb.firestore()
const RoomsRef = db.collection('Rooms')
const UserRef = db.collection('users')

const MessagesScreen = ({ navigation }) => {
  const { id, avatar, name } = useSelector(state => state.auth.profile);
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [cvsName, setCvsName] = useState('');
  const [lstRoom, setLstRoom] = useState([]);
  const [lstUser, setLstUser] = useState([]);

  function toDateTime(secs) {
    let d = new Date(secs);
    return d.toString().substr(4, 17);
  }

  const onCreateConverSation = (targetId, targetName, targetAvatar) => {
    try {
      const conversation = {
        nameRoom: `${name} và ${targetName}`,
        userId: [`${targetId}`, `${id}`],
        imgRoom: targetAvatar,
        lastMessage: `${name} đã tạo nhóm!`,
        lastMessageTime: new Date()
      };
      let check = false;
      lstRoom.every(item => {
        if (conversation.userId.every((value, index) => value === item.userId[index])) {
          check = true;
          hideDialog()
          Toast.show({
            type: 'error',
            topOffset: 40,
            text1: 'Thông báo',
            text2: 'cuộc trò chuyện đã tồn tại',
          });
          return false;
        }
      })
      if (check == false) {
        RoomsRef.add(conversation);
        hideDialog()

        Toast.show({
          type: 'success',
          topOffset: 40,
          text1: 'Thông báo',
          text2: 'Tạo cuộc trò chuyện thành công!',
        });
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: error,
      });
    }
  }


  const onDeleteConversation = () => {
      
  }

  useEffect(() => {
    const querySnapshot = RoomsRef.where("userId", "array-contains", `${id}`).orderBy("lastMessageTime", "desc")
    querySnapshot.onSnapshot(snap => {
      const data = [
        ...snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id, timeConverter: doc.data().lastMessageTime.toDate() }
        })
      ]
      setLstRoom(data);
    })

    const querySnapshotUser = UserRef
    querySnapshotUser.get().then(
      snap => {
        const dataUser = [
          ...snap.docs.map(doc => {
            return { ...doc.data(), id: doc.id }
          })
        ]
        const userExist = dataUser.find(item => item._id === id);
        if (userExist) {
          UserRef.doc(userExist.id).update({
            "name": name,
            "avatar": avatar
          })
        } else {
          UserRef.add({
            "_id": id,
            "name": name,
            "avatar": avatar
          })
        }
        const dataFilter = dataUser.filter(item => item._id !== id);
        setLstUser(dataFilter)
      }
    )
    return () => { setLstRoom([]); setLstUser([]) }

  }, [])

  return (
    <Provider>
      <Container>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Tạo cuộc trò chuyện mới</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Nhập tên cuộc trò chuyện</Paragraph>
              <TextInput
                value={cvsName}
                onChangeText={setCvsName}
                style={styles.inputt}
              />
              <FlatList
                data={lstUser}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Card
                    onPress={() => {
                      onCreateConverSation(item._id, item.name, item.avatar)
                    }}
                  >
                    <UserInfo>
                      <UserImgWrapper>
                        <UserImg source={{ uri: item.avatar }} />
                      </UserImgWrapper>
                      <TextSection>
                        <UserInfoText>
                          <UserName>{item.name}</UserName>
                        </UserInfoText>
                      </TextSection>
                    </UserInfo>

                  </Card>
                )}
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
            inputStyle={{ fontSize: 16, paddingVertical: 5 }}
            placeholder="Search"
          />

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => { setVisible(true) }}
          >
            <Ionicons
              name="ios-create-outline"
              size={23}
              style={styles.iconCreate}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={lstRoom}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate('Chat', {
                  userName: item.nameRoom,
                  _id: id,
                  avt: avatar,
                  uname: name,
                  idRoom: item.id,
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
                    <PostTime>{toDateTime(item.timeConverter)}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.lastMessage}</MessageText>
                </TextSection>
                <TouchableOpacity onPress={() => {   onDeleteConversation(item.id) }}>
                  <Entypo name="dots-three-vertical" style={{ marginTop: 30 }} size={20} />
                </TouchableOpacity>
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
    flexDirection: 'row',
  },
  searchBarr: {
    marginVertical: 10,
    borderRadius: 20,
    marginLeft: 15,
    elevation: 0,
    backgroundColor: '#ebebebeb',
    height: 33,
    width: '90%',
  },
  createBtn: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  inputt: {
    height: 30,
  },
  iconCreate: {
    paddingRight: 15
  }
});
