import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  Searchbar,
  Subheading,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FilterModal from '../../../components/store/FilterModal.js';
import FoodList from '../../../components/store/FoodList.js';
import { COLORS } from '../../../constants/color.const.js';
import {
  filterFoodAction,
  foodListAction,
  searchFoodAction,
} from '../../../redux/store/food/actions/foodAction.js';
import { searchTagAction } from '../../../redux/store/tag/action/tagAction.js';
import { styles } from '../../../styles/paper.js';

const FoodListScreen = ({ navigation }) => {
  const { tag } = useSelector(state => state.tag);
  const food = useSelector(state => state.food.food);
  const search = useSelector(state => state.food.search);
  console.log(
    'log 🚀 ~ file: FoodListScreen.js ~ line 33 ~ FoodListScreen ~ search',
    search
  );
  const loading = useSelector(state => state.food.loading);
  const dispatch = useDispatch();
  const [tagId, setTagId] = useState(null);
  const [pickerValue, setPickerValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const handlerSearch = () => {
    dispatch(searchFoodAction(searchValue));
  };
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(foodListAction());
    });
    return focus;
  }, [dispatch]);
  useEffect(() => {
    dispatch(searchTagAction(''));
  }, [dispatch]);

  useEffect(() => {
    if (tagId) dispatch(filterFoodAction(tagId));
    if (tagId === 0) dispatch(foodListAction());
  }, [dispatch, tagId]);
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
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateFoodScreen')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons
            name="add-circle-sharp"
            size={24}
            color="white"
            style={styled.icon}
          />
          <Subheading style={{ paddingLeft: 10 }}>Thêm món</Subheading>
        </TouchableOpacity>
        <View style={{ marginLeft: 20 }}>
          <ScrollView horizontal={true}>
            <View style={styled.filter}>
              <Subheading>Tag </Subheading>
              <View style={styled.picker}>
                <Picker
                  mode="dialog"
                  style={{ width: undefined }}
                  selectedValue={pickerValue}
                  onValueChange={e => [setPickerValue(e), setTagId(e)]}
                >
                  <Picker.Item label="Tất cả" value={0} />
                  {tag.map(c => (
                    <Picker.Item key={c.id} label={c.tagName} value={c.id} />
                  ))}
                </Picker>
              </View>
            </View>
          </ScrollView>
        </View>
        <FilterModal />
      </View>
      <View style={{ padding: 10, zIndex: -15, backgroundColor: '#fff' }}>
        <Searchbar
          placeholder="Tìm kiếm"
          value={searchValue}
          onChangeText={searchValue => setSearchValue(searchValue)}
          onSubmitEditing={() => handlerSearch()}
          style={styles.search}
        />
      </View>
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
  },
});
export default FoodListScreen;
