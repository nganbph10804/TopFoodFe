import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import dataFriend from '../components/FriendList/dataFriend';
import ItemFr from './../components/FriendList/FriendItem';
import styles from './../components/MessageItem/style';

const FriendListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (

    <View style={styles.wrapper}>
    <Searchbar 
    style={styled.search}
    onChangeText={onChangeSearch}
    value={searchQuery}
    placeholder="Search Friend" />
    <FlatList
        data={ dataFriend }
        renderItem={({ item }) => (
        <ItemFr item={ item } />
        )}
        keyExtractor={(item) => item.id.toString() } // tránh trùng các item với nhau
    />
</View>
  );
};

const styled = StyleSheet.create({
  search :{
    marginHorizontal: 15,
    marginVertical:20,
    fontSize: 10,
    borderRadius: 20,
    elevation:0,
    backgroundColor:'#ebebeb'
  }
})
export default FriendListScreen;
