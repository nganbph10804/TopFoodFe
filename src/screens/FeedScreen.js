import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Chip, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import HomeList from '../components/home/HomeList.js';
import { COLORS } from '../constants/color.const.js';
import HeaderUser from '../shared/HeaderUser.js';
import { styles } from '../styles/paper.js';
import { _ } from 'lodash';

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.feed);
  const [city, setCity] = useState([]);
  const [visible, setVisible] = useState(false);
  const [citySelected, setCitySelected] = useState([]);
  console.log(
    'log 🚀 ~ file: FeedScreen.js ~ line 23 ~ FeedScreen ~ citySelected',
    citySelected
  );

  const handlerChecked = id => {
    let arr = city.map((i, idx) => {
      if (i.code === id) {
        i.isSelected = !i.isSelected;
      }
      return { ...i };
    });
    setVisible(false);
  };

  useEffect(() => {
    let arr2 = _.filter(city, 'isSelected');
    setCitySelected(arr2);
  }, [city]);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(resp => resp.json())
      .then(resp => {
        let arr2 = resp.map(i => {
          i.isSelected = false;
          return { ...i };
        });
        setCity(arr2);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.background}>
      <HeaderUser />
      {visible && (
        <Modal>
          <Button onPress={() => setVisible(false)}>Đóng</Button>
          <ScrollView>
            {city.map((i, idx) => (
              <View
                key={idx}
                style={{ marginHorizontal: 40, marginVertical: 5 }}
              >
                <Chip
                  onPress={() => handlerChecked(i.code)}
                  mode="outlined"
                  selected={i.isSelected ? true : false}
                  style={i.isSelected ? styled.active : styled.inactive}
                  selectedColor={i.isSelected ? '#fff' : '#000'}
                  icon={() => (
                    <Ionicons
                      name="checkbox"
                      size={24}
                      color={i.isSelected ? '#fff' : '#000'}
                    />
                  )}
                >
                  {i.name}
                </Chip>
              </View>
            ))}
          </ScrollView>
        </Modal>
      )}
      <View style={styles.currentBackground}>
        <ScrollView>
          <View>
            <Title style={styles.title}>Trang chủ</Title>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginRight: 30,
              }}
              onPress={() => setVisible(true)}
            >
              <Feather name="map-pin" size={24} color={`${COLORS.blue[4]}`} />
              <Subheading>
                Xem tại,{' '}
                <Subheading
                  style={{ color: `${COLORS.blue[4]}`, fontWeight: 'bold' }}
                >
                  Hà nội
                </Subheading>
              </Subheading>
            </TouchableOpacity>
          </View>
          {feed.map((i, index) => (
            <HomeList key={index} feed={i} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  active: {
    backgroundColor: `${COLORS.blue[1]}`,
    color: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  inactive: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});

export default FeedScreen;
