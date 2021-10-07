import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Item from '../components/MessageItem/MessItem';
import data from './../components/MessageItem/dataMes';
import styles from './../components/MessageItem/style';
let inputRef = React.createRef();


const MessageScreen = () => {
  return (
    
      <View ref={inputRef} style={styles.wrapper}>
          <FlatList
              data={ data }
              renderItem={({ item }) => (
              <Item item={ item } />
              )}
              keyExtractor={(item) => item.id.toString() } // tránh trùng các item với nhau
              parentFlatList={this} //để lát làm swipe left và swipe right
          />
      </View>
  );
};

export default MessageScreen;
