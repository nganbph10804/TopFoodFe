import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  CheckBox,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Searchbar,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { friendListAction } from '../redux/friend/actions/friendAction.js';
import HeaderUser from '../shared/HeaderUser.js';
import {
  Cardd,
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
import { LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const db = fb.firestore();
const RoomsRef = db.collection('Rooms');
const UserRef = db.collection('users');
const ChatRef = db.collection('chats');

const MessagesScreen = ({ navigation }) => {
  const { id, avatar, name } = useSelector(state => state.auth.profile);
  const { friend } = useSelector(state => state.friend);
  const hideDialog = () => setVisible(false);
  const hideDialogCreate = () => setVisibleCreate(false);
  const [visible, setVisible] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [lstRoom, setLstRoom] = useState([]);
  const [lstUser, setLstUser] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [lstSuggest, setLstSuggest] = useState([]);
  const onChangeSearch = query => setSearchVal(query);

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

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
        lastMessageTime: new Date(),
      };
      let check = false;
      lstRoom.every(item => {
        if (
          conversation.userId.every(
            (value, index) => value === item.userId[index]
          )
        ) {
          check = true;
          hideDialog();
          Toast.show({
            type: 'error',
            topOffset: 40,
            text1: 'Thông báo',
            text2: 'cuộc trò chuyện đã tồn tại',
          });
          return false;
        }
      });
      if (check == false) {
        RoomsRef.add(conversation);
        hideDialog();

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
        text2: error.response.data.message,
      });
    }
  };

  const onDeleteConversation = uid => {
    Alert.alert('Thông báo', 'Bạn có muốn xóa cuộc trò chuyện này?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          try {
            RoomsRef.doc(uid)
              .delete()
              .then(() => {
                const chatDeleteQuery = ChatRef.where('idRoom', '==', uid);
                chatDeleteQuery.get().then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                  });
                });
                Toast.show({
                  type: 'success',
                  topOffset: 40,
                  text1: 'Thông báo',
                  text2: 'Đã xóa cuộc trò chuyện',
                });
              });
          } catch (error) {
            Toast.show({
              type: 'error',
              topOffset: 40,
              text1: 'Thông báo',
              text2: error.response.data.message,
            });
          }
        },
      },
    ]);
  };

  const handleChange = id => {
    let temp = products.map(product => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };
  const onCreateGroup = () => {
    try {
      let selected = products.filter(product => product.isChecked);
      let lstId = selected.map(lt => lt._id);
      let strVal = lstId.map(String);
      const conversation = {
        nameRoom: `Nhóm của ${name}`,
        userId: [...strVal, id.toString()],
        imgRoom: avatar,
        lastMessage: `${name} đã tạo nhóm!`,
        lastMessageTime: new Date(),
      };
      RoomsRef.add(conversation);
      hideDialogCreate();

      Toast.show({
        type: 'success',
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Tạo cuộc trò chuyện thành công!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 40,
        text1: 'Thông báo',
        text2: 'Có lỗi không xác định!',
      });
    }
  };

  const renderFlatList = renderData => {
    return (
      <FlatList
        style={{ height: 360 }}
        keyExtractor={item => item.id.toString()}
        data={renderData}
        renderItem={({ item }) => (
          <Cardd>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{ uri: item.avatar }} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                </UserInfoText>
                <CheckBox
                  style={{ right: 10 }}
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
              </TextSection>
            </UserInfo>
          </Cardd>
        )}
      />
    );
  };

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

    const querySnapshotUser = UserRef;
    querySnapshotUser.get().then(snap => {
      const dataUser = [
        ...snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      const userExist = dataUser.find(item => item._id === id);
      if (userExist) {
        UserRef.doc(userExist.id).update({
          name: name,
          avatar: avatar,
        });
      } else {
        if (avatar == '' || avatar == null) {
          UserRef.add({
            _id: id,
            name: name,
            avatar:
              'https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-photo-de-profil-d-avatar-masculin-ombre-l%C3%A9g%C3%A8re-de-silhouette.jpg?ver=6',
          });
        } else {
          UserRef.add({
            _id: id,
            name: name,
            avatar: avatar,
          });
        }
      }
      dispatch(friendListAction(0));
      const dataFilter = dataUser.filter(item => item._id !== id);
      setLstSuggest(dataFilter);
    });
    return () => {
      setLstRoom([]);
      setLstUser([]);
    };
  }, [dispatch]);

  setTimeout(() => {
    setLstUser(friend);
  }, 600);

  const onOpenPopupCreate = () => {
    const newLst = lstSuggest.map(el => ({ ...el, isChecked: false }));
    setProducts(newLst);
    setVisibleCreate(true);
  };

  return (
    <Provider>
      <HeaderUser />
      <Container>
        <Portal>
          <Dialog
            style={{ marginTop: 10 }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Tạo cuộc trò chuyện mới</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Tạo nhóm mới</Paragraph>

              <TouchableOpacity
                onPress={() => {
                  onOpenPopupCreate();
                }}
              >
                <FontAwesome
                  name="group"
                  size={23}
                  color="blue"
                  style={styles.createGroup}
                />
              </TouchableOpacity>

              {lstUser.length !== 0 ? (
                <>
                  <Paragraph>Bạn bè</Paragraph>
                  <FlatList
                    style={{ height: 210 }}
                    data={lstUser}
                    keyExtractor={item => item.accountId.toString()}
                    renderItem={({ item }) => (
                      <Cardd
                        onPress={() => {
                          onCreateConverSation(
                            item.accountId,
                            item.profile.name,
                            item.profile.avatar
                          );
                        }}
                      >
                        <UserInfo>
                          <UserImgWrapper>
                            <UserImg source={{ uri: item.profile.avatar }} />
                          </UserImgWrapper>
                          <TextSection>
                            <UserInfoText>
                              <UserName>{item.profile.name}</UserName>
                            </UserInfoText>
                          </TextSection>
                        </UserInfo>
                      </Cardd>
                    )}
                  />
                </>
              ) : (
                <></>
              )}
              <Paragraph>Những người bạn có thể biết</Paragraph>
              <FlatList
                style={{ height: 200 }}
                data={lstSuggest}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Cardd
                    onPress={() => {
                      onCreateConverSation(item._id, item.name, item.avatar);
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
                  </Cardd>
                )}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Hủy bỏ</Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog visible={visibleCreate} onDismiss={hideDialogCreate}>
            <Dialog.Title>Tạo nhóm trò chuyện mới</Dialog.Title>
            <Dialog.Content>
              <View>
                <View>{renderFlatList(products)}</View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialogCreate}>Hủy bỏ</Button>
              <Button
                onPress={() => {
                  onCreateGroup();
                }}
              >
                Tạo
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.container}>
          <Searchbar
           style={styles.searchBarr}
           inputStyle={{ fontSize: 16, paddingVertical: 5 }}
           placeholder="Search"
           onChangeText={onChangeSearch}
           value={searchVal}
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
          data={lstRoom.filter(val => {
            if (searchVal == '') {
              return val;
            } else if (val.nameRoom.toLowerCase().includes(searchVal.toLowerCase())) {
              return val;
            }
          })}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Cardd
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
                <TouchableOpacity
                  onPress={() => {
                    onDeleteConversation(item.id);
                  }}
                >
                  <Entypo
                    name="dots-three-vertical"
                    style={{ marginTop: 30 }}
                    size={20}
                  />
                </TouchableOpacity>
              </UserInfo>
            </Cardd>
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
  createGroup: {
    marginVertical: 10,
  },
  noFriend: {
    bottom: '10%',
    alignItems: 'center',
  },
  textXL: {
    fontSize: 20,
  },
});
