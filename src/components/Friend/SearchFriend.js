import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { FRIENDS } from '../../constants/friend.const.js';
import { sendAction } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const SearchFriend = ({ item }) => {
  const dispatch = useDispatch();
  const handlerSend = () => {
    dispatch(sendAction(item.phoneNumber));
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
            <Subheading style={{ color: `${COLORS.blue[4]}` }}>
              BẠN BÈ
            </Subheading>
          ) : item.friendStatus === FRIENDS.SENDING ? (
            <Subheading style={{ color: `${COLORS.orange}` }}>
              ĐÃ GỬI LỜI MỜI
            </Subheading>
          ) : (
            <Button onPress={() => handlerSend()}>Kết bạn</Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchFriend;
