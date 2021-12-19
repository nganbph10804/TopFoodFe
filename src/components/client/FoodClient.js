import { _ } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const';
import { foodListAction } from '../../redux/store/food/actions/foodAction';
import { styles } from '../../styles/paper';
import FoodList from '../store/FoodList';
import FoodsHot from '../store/FoodsHot';

const FoodClient = ({ storeId, navigation }) => {
  const dispatch = useDispatch();
  const food = useSelector(state => state.food.food);
  const loading = useSelector(state => state.food.loading);

  const [hot, setHot] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    dispatch(foodListAction(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    setHot(_.filter(food, i => i.foodHot));
    setFoods(_.filter(food, i => !i.foodHot));
  }, [food]);

  return (
    <ScrollView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      )}
      <View>
        {hot.length > 0 && (
          <Subheading style={styled.hot}>Món ăn hot</Subheading>
        )}
        <ScrollView horizontal={true}>
          {hot.map((i, index) => (
            <FoodsHot
              key={index}
              food={i}
              navigation={navigation}
              storeId={storeId}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        {food.length < 1 ? (
          <View style={styled.noFood}>
            <Title>Không có món ăn</Title>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Subheading style={styled.normal}>Món ăn</Subheading>
            {foods.map((i, index) => (
              <FoodList
                key={index}
                food={i}
                navigation={navigation}
                storeId={storeId}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styled = StyleSheet.create({
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

export default FoodClient;
