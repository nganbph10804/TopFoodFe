import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, Card, Searchbar, Subheading, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { FRIENDS } from '../../constants/friend.const.js';
import {
  acceptAction,
  clearSearchAction,
  listRequestAction,
  searchProfileAction,
  sendAction,
} from '../../redux/friend/actions/friendAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

const SearchFriendScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(state => state.friend.search);
  const dispatch = useDispatch();

  const handlerSearch = () => {
    if (searchValue.trim().length > 0) {
      dispatch(searchProfileAction(searchValue, 0));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Không được để trống',
      });
    }
  };

  const handlerSend = item => {
    dispatch(sendAction(item.phoneNumber));
  };
  const accept = item => {
    dispatch(acceptAction(item.username));
    setSearchValue('');
    dispatch(clearSearchAction());
  };
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(listRequestAction(0));
      dispatch(clearSearchAction());
      setSearchValue('');
    });
    return focus;
  }, [dispatch]);

  return (
    <View style={styles.background}>
      <HeaderUser />
      <Card style={styles.currentBackground}>
        <Title style={styles.title}>Tìm kiếm bạn bè</Title>
        <View
          style={{
            width: '95%',
            marginTop: 20,
            position: 'relative',
            alignSelf: 'center',
          }}
        >
          <Searchbar
            placeholder="Tìm bạn bè"
            value={searchValue}
            onChangeText={searchValue => setSearchValue(searchValue)}
            onSubmitEditing={() => handlerSearch()}
            style={styles.search}
          />
        </View>
        <ScrollView>
          {profile.map((item, key) => (
            <View style={styles.Item} key={key}>
              <Image
                source={{
                  uri: `${item.profile.avatar}`,
                }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 75,
                  overflow: 'hidden',
                }}
              />
              <Text
                style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}
              >
                {item.profile.name}
              </Text>
              <View style={styles.lastItem}>
                {item.friendStatus === FRIENDS.FRIEND ? (
                  <Button color={`${COLORS.blue[4]}`}>BẠN BÈ</Button>
                ) : item.friendStatus === FRIENDS.SENDING ? (
                  item.isPersonSending === FRIENDS.IS_PERSON ? (
                    <Button color={`${COLORS.orange}`}>ĐÃ GỬI</Button>
                  ) : (
                    <Button
                      color={`${COLORS.blue[1]}`}
                      onPress={() => accept(item)}
                    >
                      CHẤP NHẬN
                    </Button>
                  )
                ) : (
                  <Button onPress={() => handlerSend(item)}>Kết bạn</Button>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </Card>
    </View>
  );
};

export default SearchFriendScreen;
