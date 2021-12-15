import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Searchbar,
  Subheading,
  Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FilterCtg from '../../../components/store/FilterCtg.js';
import FoodList from '../../../components/store/FoodList.js';
import SearchFood from '../../../components/store/SearchFood.js';
import TagList from '../../../components/store/TagList.js';
import { COLORS } from '../../../constants/color.const.js';
import {
  clearSearchAction,
  foodListAction,
  searchFoodAction,
} from '../../../redux/store/food/actions/foodAction.js';
import { styles } from '../../../styles/paper.js';
import FoodsHot from '../../../components/store/FoodsHot.js';

const FoodListScreen = ({ navigation }) => {
  const account = useSelector(state => state.auth.account);
  const { tag } = useSelector(state => state.tag);
  const food = useSelector(state => state.food.food);
  const loading = useSelector(state => state.food.loading);
  const tags = useSelector(state => state.food.tagName);
  const search = useSelector(state => state.food.search);
  const role = useSelector(state => state.auth.account.role);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(null);
  const [active, setActive] = useState(-1);
  const [focus, setFocus] = useState();
  const [ctg, setCtg] = useState();
  const [tagId, setTagId] = useState();
  const [tagData, setTagData] = useState([]);

  const [hot, setHot] = useState([]);
  const [foods, setFoods] = useState([]);

  const handlerFilter = id => {
    if (id === 'ALL') {
      dispatch(foodListAction(account.id));
      setCtg(false);
    } else {
      setTagId(id);
      setCtg(true);
    }
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    ref.current.blur();
    ref.current.clear();
    dispatch(clearSearchAction());
  };

  useEffect(() => {
    setHot(_.filter(food, i => i.foodHot));
    setFoods(_.filter(food, i => !i.foodHot));
  }, [food]);

  useEffect(() => {
    if (tagId) {
      let data = _.filter(food, i => i.tag.id === tagId);
      setTagData(data);
    }
  }, [tagId]);

  useEffect(() => {
    if (searchValue) {
      setTimeout(() => {
        dispatch(searchFoodAction(searchValue));
      }, 500);
    }
  }, [dispatch, searchValue]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(foodListAction(account.id));
    });
    return focus;
  }, [dispatch]);

  return (
    <View style={styles.main}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        {role === 'ROLE_STORE' && (
          <View style={styled.container}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateFoodScreen')}
              color={`${COLORS.blue[1]}`}
              icon={() => (
                <Ionicons
                  name="add-circle-sharp"
                  size={24}
                  color="white"
                  style={styled.icon}
                />
              )}
            >
              Thêm món ăn
            </Button>
          </View>
        )}

        <View style={{ padding: 10, zIndex: -15, backgroundColor: '#fff' }}>
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
        <View>
          <ScrollView horizontal={true}>
            <View style={styled.filter}>
              <TagList
                data={tag}
                active={active}
                setActive={setActive}
                handlerFilter={handlerFilter}
              />
            </View>
          </ScrollView>
        </View>
        {focus && search.length < 1
          ? null
          : search.map(i => (
              <SearchFood key={i.id} food={i} navigation={navigation} />
            ))}
        <View>
          {hot && <Subheading style={styled.hot}>Món ăn hot</Subheading>}
          <ScrollView horizontal={true}>
            {hot.map((i, index) => (
              <FoodsHot key={index} food={i} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
        {!focus && !ctg && (
          <View>
            {food.length < 1 ? (
              <View style={styled.noFood}>
                <Title key={idx}>Không có món ăn</Title>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Subheading style={styled.normal}>Món ăn</Subheading>
                {foods.map(i => (
                  <FoodList key={i.id} food={i} navigation={navigation} />
                ))}
              </View>
            )}
          </View>
        )}
        {ctg && (
          <View style={{ flex: 1 }}>
            {tagData.map(i => (
              <FilterCtg
                key={i.id}
                foods={i}
                navigation={navigation}
                tagName={tags}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  food: {
    width: 65,
    height: 65,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: `${COLORS.blue[1]}`,
    marginVertical: 10,
  },
  search: {
    width: 65,
    height: 65,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: `${COLORS.purple[3]}`,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    backgroundColor: `${COLORS.blue[1]}`,
    padding: 5,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    marginTop: 10,
  },
  picker: {
    borderWidth: 1,
    width: 120,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#aec4e6',
  },
  noFood: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  hot: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 20,
    marginVertical: 10,
  },
  normal: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 20,
    marginVertical: 10,
  },
});
export default FoodListScreen;
