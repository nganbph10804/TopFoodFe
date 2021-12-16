import { AntDesign } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Chip, Paragraph, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FoodByTag from '../../../components/store/FoodByTag.js';
import { COLORS } from '../../../constants/color.const.js';
import { formatPrice } from '../../../constants/price.const.js';
import { foodDetailAction } from '../../../redux/store/food/actions/foodAction.js';
import { getTagId } from '../../../redux/store/tag/action/tagAction.js';
import {
  unVoteFoodAction,
  voteFoodAction,
} from '../../../redux/vote/voteAction.js';

const FoodDetailScreen = ({ navigation, route }) => {
  const { id, name, content, price, files, tag } = route.params.food;
  const food = useSelector(state => state.food.food);
  const dispatch = useDispatch();
  const foodDetail = useSelector(state => state.food.detail);
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
    dispatch(getTagId(tag.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(foodDetailAction(id));
  }, [dispatch, id]);

  return (
    <ScrollView style={{ backgroundColor: `${COLORS.white[1]}` }}>
      <Card
        style={{
          marginTop: 10,
        }}
        mode="elevated"
      >
        <SliderBox
          images={files}
          sliderBoxHeight={300}
          dotColor={`${COLORS.blue[1]}`}
          inactiveDotColor="#90A4AE"
        />
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph
            style={{
              color: `${COLORS.purple[2]}`,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {formatPrice(price)}
          </Paragraph>
          <Paragraph>Mô tả: {content}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <View style={{ position: 'absolute', right: 20, top: 0 }}>
            {foodDetail.myReaction && foodDetail.totalReaction > 0 && (
              <Chip onPress={() => handlerUnVote(id)}>
                <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                  {foodDetail.totalReaction} votes
                </Subheading>
              </Chip>
            )}
            {!foodDetail.myReaction && foodDetail.totalReaction > 0 && (
              <Chip onPress={() => handlerVote(id)}>
                <AntDesign name="staro" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `#000` }}>
                  {foodDetail.totalReaction}
                  votes
                </Subheading>
              </Chip>
            )}
          </View>
        </Card.Actions>
      </Card>
      {foodByTag.length < 1 ? null : (
        <View>
          <View style={styled.hashTag}>
            <Subheading style={styled.title}>
              Hash Tag món ăn:{' '}
              <Subheading style={styled.tag}>#{tag.tagName}</Subheading>
            </Subheading>
          </View>
          {foodByTag.map(i => (
            <FoodByTag
              key={i.id}
              food={i}
              tagId={tag.id}
              navigation={navigation}
              tagName={tag.tagName}
            />
          ))}
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
  tag: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 19,
    fontStyle: 'italic',
  },
  title: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  hashTag: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
export default FoodDetailScreen;
