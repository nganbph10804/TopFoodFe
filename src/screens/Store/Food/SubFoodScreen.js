import { AntDesign, Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Chip, Paragraph, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FoodByTag from '../../../components/store/FoodByTag.js';
import { COLORS } from '../../../constants/color.const.js';
import { formatPrice } from '../../../constants/price.const.js';
import { foodDetailAction } from '../../../redux/store/food/actions/foodAction.js';
import {
  unVoteFoodAction,
  voteFoodAction,
} from '../../../redux/vote/voteAction.js';

const SubFoodScreen = ({ navigation, route }) => {
  const { content, name, price, files, id, tag } = route.params.food;
  const dispatch = useDispatch();
  const foodDetail = useSelector(state => state.food.detail);
  const food = useSelector(state => state.food.food);
  const foodByTag = _.filter(
    _.filter(food, i => i.tag.id === tag.id),
    i => i.id !== id
  );

  const handlerVote = id => {
    dispatch(voteFoodAction(id));
  };

  const handlerUnVote = id => {
    dispatch(unVoteFoodAction(id));
  };

  useEffect(() => {
    dispatch(foodDetailAction(id));
  }, [dispatch, id]);
  return (
    <ScrollView>
      <Card>
        <SliderBox
          images={files}
          sliderBoxHeight={300}
          dotColor={`${COLORS.blue[1]}`}
          inactiveDotColor="#90A4AE"
        />
        <Card.Content>
          <Title>{name}</Title>
          <Subheading>{formatPrice(price)} </Subheading>
          <Paragraph>{content}</Paragraph>
          <View style={{ position: 'absolute', right: 20, top: 30 }}>
            {foodDetail.myReaction && (
              <Chip onPress={() => handlerUnVote(id)}>
                <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                  {foodDetail.totalReaction} votes
                </Subheading>
              </Chip>
            )}
            {!foodDetail.myReaction && (
              <Chip onPress={() => handlerVote(id)}>
                <AntDesign name="staro" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `#000` }}>
                  {foodDetail.totalReaction} votes
                </Subheading>
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>
      {foodByTag.length < 1 ? (
        <View>
          <Text></Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingBottom: 20,
              paddingTop: 10,
            }}
          >
            <Entypo name="price-tag" size={24} color={`${COLORS.blue[1]}`} />
            <Subheading style={{ paddingLeft: 10 }}>
              Tag món ăn / {route.params.tagName}
            </Subheading>
          </View>
          <View style={styled.main}>
            {foodByTag.map(i => (
              <FoodByTag
                key={i.id}
                food={i}
                tagId={route.params.tagId}
                navigation={navigation}
                tagName={route.params.tagName}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styled = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});
export default SubFoodScreen;
