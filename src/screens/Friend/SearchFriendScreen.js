import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SearchFriend from '../../components/Friend/SearchFriend.js';
import { Main } from '../../components/index.js';
import {
  listRequestAction,
  searchProfileAction,
} from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const SearchFriendScreen = () => {
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState('');
  const profile = useSelector(state => state.friend.search);
  const filter_friend = useSelector(state => state.friend.filter_friend);

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const request = useSelector(state => state.friend.request);

  const handlerSearch = () => {
    dispatch(searchProfileAction(searchValue, page));
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(listRequestAction(page));
    }
  }, [dispatch, page]);
  return (
    <Main>
      <View
        style={{
          position: 'relative',
          width: '95%',
          marginTop: 10,
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
    </Main>
  );
};

export default SearchFriendScreen;
