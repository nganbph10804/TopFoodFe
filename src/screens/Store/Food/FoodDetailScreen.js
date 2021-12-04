import { AntDesign, Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import {
  ActivityIndicator,
  Card,
  Chip,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
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
import { styles } from '../../../styles/paper.js';

const FoodDetailScreen = ({ navigation, route }) => {
  const { id, name, content, price, files, tag } = route.params.food;
  const food = useSelector(state => state.food.food);
  const dispatch = useDispatch();
  const foodDetail = useSelector(state => state.food.detail);
  const { loading } = useSelector(state => state.voteFood);
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
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[4]}`}
            size={'large'}
            style={{ zIndex: 999999 }}
          />
        </View>
      )}
      <ScrollView>
        <Card
          style={{
            marginVertical: 10,
            zIndex: -10,
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
            <Subheading style={{ color: `${COLORS.purple[2]}` }}>
              {formatPrice(price)}
            </Subheading>
            <Paragraph>Mô tả: {content}</Paragraph>
            <View style={{ position: 'absolute', right: 20, top: 30 }}>
              {foodDetail.myReaction && (
                <Chip onPress={() => handlerUnVote(id)}>
                  <AntDesign
                    name="star"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
                  <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                    {foodDetail.totalReaction} votes
                  </Subheading>
                </Chip>
              )}
              {!foodDetail.myReaction && (
                <Chip onPress={() => handlerVote(id)}>
                  <AntDesign
                    name="staro"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
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
              <Entypo name="price-tag" size={24} color={`black`} />
              <Title style={{ paddingLeft: 10, color: `black` }}>
                Tag món ăn: #{tag.tagName}
              </Title>
            </View>
            <View style={styled.main}>
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
          </View>
        )}
      </ScrollView>
    </View>
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
export default FoodDetailScreen;
