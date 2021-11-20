import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Searchbar, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SearchFriend from '../../components/Friend/SearchFriend.js';
import {
  clearSearchAction,
  listRequestAction,
  searchProfileAction,
} from '../../redux/friend/actions/friendAction.js';
import HeaderUser from '../../shared/HeaderUser.js';
import { styles } from '../../styles/paper.js';

const SearchFriendScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(state => state.friend.search);
  const dispatch = useDispatch();

  const handlerSearch = () => {
    dispatch(searchProfileAction(searchValue, 0));
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
        <View>
          {profile.map((item, key) => (
            <SearchFriend key={key} item={item} />
          ))}
        </View>
      </Card>
    </View>
  );
};

export default SearchFriendScreen;
