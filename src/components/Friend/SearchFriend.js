import React from 'react';
import { Image, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { FRIENDS } from '../../constants/friend.const.js';
import {
  acceptAction,
  clearSearchAction,
  sendAction,
} from '../../redux/friend/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const SearchFriend = ({ item, setSearchValue }) => {
  const dispatch = useDispatch();
  const handlerSend = () => {
    dispatch(sendAction(item.phoneNumber));
  };
  const accept = () => {
    dispatch(acceptAction(item.username));
    setSearchValue('');
    dispatch(clearSearchAction());
  };
  return (
    <View>
      <View style={styles.Item}>
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
        <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
          {item.profile.name}
        </Text>
        <View style={styles.lastItem}>
          {item.friendStatus === FRIENDS.FRIEND ? (
            <Button color={`${COLORS.blue[4]}`}>BẠN BÈ</Button>
          ) : item.friendStatus === FRIENDS.SENDING ? (
            item.isPersonSending === FRIENDS.IS_PERSON ? (
              <Button color={`${COLORS.orange}`}>ĐÃ GỬI</Button>
            ) : (
              <Button color={`${COLORS.blue[1]}`} onPress={() => accept()}>
                CHẤP NHẬN
              </Button>
            )
          ) : (
            <Button onPress={() => handlerSend()}>Kết bạn</Button>
          )}
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default SearchFriend;
