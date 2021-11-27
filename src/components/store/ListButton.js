import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';

const ListButton = ({ navigation }) => {
  const { role } = useSelector(state => state.auth.account);
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.food}
        onPress={() => navigation.navigate('FoodListScreen')}
      >
        <MaterialIcons
          name="fastfood"
          size={30}
          color={`${COLORS.blue[1]}`}
          style={styles.icon}
        />
        <Text style={styles.text}>Món ăn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.feed}
        onPress={() => navigation.navigate('FeedListScreen')}
      >
        <Ionicons
          name="md-newspaper-outline"
          size={30}
          color={`${COLORS.purple[3]}`}
          style={styles.icon}
        />
        <Text style={styles.text}>Bài viết</Text>
      </TouchableOpacity>
      {role === 'ROLE_STORE' && (
        <TouchableOpacity style={styles.manager}>
          <AntDesign
            name="slack-square"
            size={30}
            color={`${COLORS.blue[5]}`}
            style={styles.icon}
          />
          <Text style={styles.text}>Thống kê</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#fff',
  },
  food: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: `${COLORS.blue[1]}`,
  },
  text: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },
  feed: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: `${COLORS.purple[3]}`,
  },
  manager: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: `${COLORS.blue[5]}`,
  },
});
export default ListButton;
