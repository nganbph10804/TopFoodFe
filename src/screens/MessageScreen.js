import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const db = fb.firestore();
const RoomsRef = db.collection('Rooms');

const MessagesScreen = ({ navigation }) => {
  const { id, avatar, name } = useSelector(state => state.auth.profile);
  const hideDialog = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [cvsName, setCvsName] = useState('');
  const [cvsId, setCvsId] = useState('');
  const [lstRoom, setLstRoom] = useState([]);

  function toDateTime(secs) {
    let d = new Date(secs);
    return d.toString().substr(4, 17);
  }

  useEffect(() => {
    const querySnapshot = RoomsRef.where(
      'userId',
      'array-contains',
      `${id}`
    ).orderBy('lastMessageTime', 'desc');
    querySnapshot.onSnapshot(snap => {
      const data = [
        ...snap.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
            timeConverter: doc.data().lastMessageTime.toDate(),
          };
        }),
      ];
      setLstRoom(data);
    });

    return () => {
      setLstRoom([]);
    };
  }, [id]);

  return (
    <Provider>
      <Container>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Tạo cuộc trò chuyện mới</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Tìm tên bạn bè</Paragraph>
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
              <Button onPress={() => {}}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={styles.container}>
          <Searchbar
            style={styles.searchBarr}
            inputStyle={{ fontSize: 16, paddingVertical: 5 }}
            placeholder="Search"
          />

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => {
              setVisible(true);
            }}
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
    paddingRight: 15,
  },
});
