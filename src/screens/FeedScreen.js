import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Chip, Searchbar, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import HomeList from '../components/home/HomeList.js';
import SearchValue from '../components/home/SearchValue.js';
import { COLORS } from '../constants/color.const.js';
import { favoriteListAction } from '../redux/favorite/favoriteAction.js';
import {
  postListAction,
  postListByCityAction,
} from '../redux/post/postAction.js';
import {
  allPostAction,
  searchPostAction,
} from '../redux/searchPost/searchAction.js';
import { searchTagAction } from '../redux/store/tag/action/tagAction.js';
import HeaderUser from '../shared/HeaderUser.js';
import { styles } from '../styles/paper.js';

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postCity = useSelector(state => state.post.city);
  const total = useSelector(state => state.favorite.total);
  const role = useSelector(state => state.auth.account.role);
  const { search } = useSelector(state => state.search);

  const [city, setCity] = useState([]);
  const [visible, setVisible] = useState(false);
  const [citySelected, setCitySelected] = useState({
    code: 1,
    name: 'Thành phố Hà Nội',
  });
  const [searchValue, setSearchValue] = useState('');
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  const handlerChecked = item => {
    setCitySelected(item);
    setVisible(false);
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    ref.current.blur();
    ref.current.clear();
  };

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      dispatch(searchPostAction(searchValue));
    }
  }, [dispatch, searchValue]);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(resp => resp.json())
      .then(resp => {
        setCity(resp);
      });
  }, []);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(favoriteListAction());
      dispatch(searchTagAction());
      dispatch(postListAction());
    });
    return focus;
  }, [dispatch]);

  useEffect(() => {
    dispatch(postListByCityAction(citySelected.code));
  }, [dispatch, citySelected.code]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(postListByCityAction(citySelected.code));
    });
    return focus;
  }, []);

  useEffect(() => {
    if (role === 'ROLE_USER') {
      if (total < 4) {
        navigation.navigate('FavoriteScreen');
      } else {
        navigation.navigate('FeedScreen');
      }
    }
  }, [total]);

  useEffect(() => {
    dispatch(allPostAction());
  }, [dispatch]);

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
                style={{
                  marginHorizontal: 40,
                  marginVertical: 5,
                }}
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
        <ScrollView style={{ marginBottom: 100 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Title style={styles.title}>Trang chủ</Title>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => setVisible(true)}
            >
              <Feather name="map-pin" size={24} color={`${COLORS.blue[4]}`} />
              <Subheading ellipsizeMode="tail">
                Xem tại,{' '}
                <Subheading
                  style={{
                    color: `${COLORS.blue[4]}`,
                    fontWeight: 'bold',
                  }}
                  ellipsizeMode="tail"
                >
                  {citySelected.name}
                </Subheading>
              </Subheading>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 20 }}>
            <Searchbar
              placeholder="Tìm kiếm"
              ref={ref}
              onFocus={onFocus}
              value={searchValue}
              onChangeText={searchValue => setSearchValue(searchValue)}
              style={styles.search}
              clearIcon={() => (
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="black"
                  onPress={onBlur}
                />
              )}
            />
          </View>
          {focus && search.length > 0
            ? search.map((i, index) => <SearchValue key={index} post={i} />)
            : null}
          {!focus && postCity.length > 0
            ? postCity.map((i, index) => (
                <HomeList
                  key={index}
                  post={i}
                  navigation={navigation}
                  citySelected={citySelected}
                />
              ))
            : null}
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
  noPost: {
    marginLeft: 30,
    marginTop: 20,
  },
});

export default FeedScreen;
