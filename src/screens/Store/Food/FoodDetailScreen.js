import { AntDesign } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { findTagIdByStoreAction } from '../../../redux/store/tag/action/tagAction.js';
import {
  unVoteFoodAction,
  voteFoodAction,
} from '../../../redux/vote/voteAction.js';
import { styles } from '../../../styles/paper.js';

const FoodDetailScreen = ({ navigation, route }) => {
  const { id, name, content, price, files, tag } = route.params.food;
  const dispatch = useDispatch();
  const foodDetail = useSelector(state => state.food.detail);
  const { loading } = useSelector(state => state.voteFood);
  const detail = useSelector(state => state.tag.detail);
  const foodByTag = _.filter(_.filter(detail.foods, i => i.id !== id));

  const handlerVote = id => {
    dispatch(voteFoodAction(id, tag.id));
  };

  const handlerUnVote = id => {
    dispatch(unVoteFoodAction(id, tag.id));
  };

  useEffect(() => {
    dispatch(findTagIdByStoreAction(tag.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(foodDetailAction(id));
  }, [dispatch, id]);

  return (
    <View
      style={{ flex: 1, backgroundColor: `${COLORS.white[1]}`, height: '100%' }}
    >
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
            <Subheading
              style={{ color: `${COLORS.purple[2]}`, fontStyle: 'italic' }}
            >
              {formatPrice(price)}
            </Subheading>
            <Paragraph>Mô tả: {content}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <View style={{ position: 'absolute', right: 20 }}>
              {foodDetail.myReaction && (
                <Chip onPress={() => handlerUnVote(id)}>
                  <AntDesign
                    name="star"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                    onPress={() => handlerUnVote(id)}
                  />
                  {foodDetail.totalReaction > 0 && foodDetail.totalReaction}
                  Vote
                </Chip>
              )}
              {!foodDetail.myReaction && (
                <Chip onPress={() => handlerVote(id)}>
                  <AntDesign
                    name="staro"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                    onPress={() => handlerVote(id)}
                  />
                  {foodDetail.totalReaction > 0 && foodDetail.totalReaction}
                  Vote
                </Chip>
              )}
            </View>
          </Card.Actions>
        </Card>
        {foodByTag.length < 1 ? null : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                backgroundColor: '#aec4e6',
              }}
            >
              <Subheading
                style={{
                  paddingLeft: 10,
                  color: `black`,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
              >
                Hash Tag món ăn:{' '}
                <Subheading
                  style={{
                    color: `black`,
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontStyle: 'italic',
                  }}
                >
                  #{tag.tagName}
                </Subheading>
              </Subheading>
            </View>
            <View style={styled.main}>
              {foodByTag.map(i => (
                <FoodByTag
                  key={i.id}
                  food={i}
                  tagId={tag.id}
                  navigation={navigation}
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
