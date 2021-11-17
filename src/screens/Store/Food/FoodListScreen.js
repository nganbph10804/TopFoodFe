import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Searchbar,
  Subheading,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FilterCtg from '../../../components/store/FilterCtg.js';
import FilterModal from '../../../components/store/FilterModal.js';
import FoodList from '../../../components/store/FoodList.js';
import SearchFood from '../../../components/store/SearchFood.js';
import TagList from '../../../components/store/TagList.js';
import { COLORS } from '../../../constants/color.const.js';
import {
  clearSearchAction,
  filterFoodAction,
  foodListAction,
  searchFoodAction,
} from '../../../redux/store/food/actions/foodAction.js';
import { styles } from '../../../styles/paper.js';

const FoodListScreen = ({ navigation }) => {
  const { tag } = useSelector(state => state.tag);
  const food = useSelector(state => state.food.food);
  const loading = useSelector(state => state.food.loading);
  const foods = useSelector(state => state.food.filter);
  const tags = useSelector(state => state.food.tagName);
  const search = useSelector(state => state.food.search);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(null);
  const [active, setActive] = useState();
  const [focus, setFocus] = useState();
  const [ctg, setCtg] = useState();
  const [tagId, setTagId] = useState();

  const handlerFilter = id => {
    if (id === 'ALL') {
      dispatch(foodListAction());
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
    if (tagId) dispatch(filterFoodAction(tagId));
  }, [dispatch, tagId]);

  useEffect(() => {
    if (searchValue) {
      setTimeout(() => {
        dispatch(searchFoodAction(searchValue));
      }, 500);
    }
  }, [dispatch, searchValue]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(foodListAction());
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
      <View>
        {focus && search.length < 1
          ? null
          : search.map(i => (
              <SearchFood key={i.id} food={i} navigation={navigation} />
            ))}
      </View>
      <View>
        {!focus && !ctg && (
          <View style={{ zIndex: -7 }}>
            {food.length < 1 ? (
              <View style={styles.noFriend}>
                <Text style={styles.textXL}>Không có món ăn</Text>
              </View>
            ) : (
              <ScrollView>
                <View style={{ flex: 1 }}>
                  {food.map(i => (
                    <FoodList key={i.id} food={i} navigation={navigation} />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        )}
      </View>
      <View>
        {ctg && (
          <View style={{ zIndex: -7 }}>
            <ScrollView>
              <View style={{ flex: 1 }}>
                {foods.map(i => (
                  <FilterCtg
                    key={i.id}
                    foods={i}
                    navigation={navigation}
                    tagName={tags}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
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
    paddingLeft: 30,
    paddingVertical: 10,
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
});
export default FoodListScreen;
