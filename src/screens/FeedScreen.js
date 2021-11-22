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
import { FontAwesome } from '@expo/vector-icons';

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { feed } = useSelector(state => state.feed);
  const [city, setCity] = useState([]);
  const [visible, setVisible] = useState(false);
  const [citySelected, setCitySelected] = useState({
    code: 1,
    codename: 'thanh_pho_ha_noi',
    districts: [],
    division_type: 'thành phố trung ương',
    isSelected: false,
    name: 'Thành phố Hà Nội',
    phone_code: 24,
  });

  const handlerChecked = item => {
    setCitySelected(item);
    setVisible(false);
  };

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
              <TouchableOpacity
                key={idx}
                style={{ marginHorizontal: 40, marginVertical: 5 }}
                onPress={() => handlerChecked(i)}
              >
                <Chip
                  onPress={() => handlerChecked(i)}
                  mode="outlined"
                  style={styled.inactive}
                  selectedColor={'#000'}
                  icon={() => (
                    <FontAwesome name="map-marker" size={24} color="black" />
                  )}
                >
                  {i.name}
                </Chip>
              </TouchableOpacity>
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
                marginTop: 5,
              }}
              onPress={() => setVisible(true)}
            >
              <Feather name="map-pin" size={24} color={`${COLORS.blue[4]}`} />
              <Subheading>
                Xem tại,{' '}
                <Subheading
                  style={{ color: `${COLORS.blue[4]}`, fontWeight: 'bold' }}
                >
                  {citySelected.name}
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
    borderColor: `${COLORS.blue[1]}`,
  },
});

export default FeedScreen;
