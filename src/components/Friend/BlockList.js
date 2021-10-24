import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { unblockAction } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const Item = styled(View)`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 5px 20px;
  border-radius: 10px;
  margin: 2px 0;
`;

const BlockList = ({ friend, navigation }) => {
  const dispatch = useDispatch();
  const handlerSubmit = () => {
    dispatch(unblockAction(friend.accountId, 0));
  };
  return (
    <View>
      <View style={styles.Item}>
        <Avatar.Image
          size={60}
          source={{
            uri: `${friend.profile.avatar}`,
          }}
        />
        <Title
          style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}
          onPress={() =>
            navigation.navigate('PublicProfileScreen', { profile })
          }
        >
          {friend.profile.name}
        </Title>
        <View style={styles.lastItem}>
          <Button onPress={() => handlerSubmit()}>Bỏ chặn</Button>
        </View>
      </View>
    </View>
  );
};

export default BlockList;
