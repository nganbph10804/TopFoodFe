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
import { findTagIdByStoreAction } from '../../../redux/store/tag/action/tagAction.js';
import {
  unVoteFoodAction,
  voteFoodAction,
} from '../../../redux/vote/voteAction.js';

const SubFoodScreen = ({ navigation, route }) => {
  const { content, name, price, files, id } = route.params.food;
  const { tagId } = route.params;
  const dispatch = useDispatch();
  const foodDetail = useSelector(state => state.food.detail);
  const detail = useSelector(state => state.tag.detail);
  const foodByTag = _.filter(_.filter(detail.foods, i => i.id !== id));

  const handlerVote = id => {
    dispatch(voteFoodAction(id, tagId));
  };

  const handlerUnVote = id => {
    dispatch(unVoteFoodAction(id, tagId));
  };

  useEffect(() => {
    dispatch(findTagIdByStoreAction(tagId));
  }, [dispatch]);

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
          <Subheading
            style={{ color: `${COLORS.purple[2]}`, fontStyle: 'italic' }}
          >
            {formatPrice(price)}
          </Subheading>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <View style={{ position: 'absolute', right: 20 }}>
            {foodDetail.myReaction && (
              <Chip onPress={() => handlerUnVote(id)}>
                <AntDesign name="star" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                  {foodDetail.totalReaction > 0 && foodDetail.totalReaction}
                  votes
                </Subheading>
              </Chip>
            )}
            {!foodDetail.myReaction && (
              <Chip onPress={() => handlerVote(id)}>
                <AntDesign name="staro" size={24} color={`${COLORS.blue[4]}`} />
                <Subheading style={{ color: `#000` }}>
                  {foodDetail.totalReaction > 0 && foodDetail.totalReaction}
                  votes
                </Subheading>
              </Chip>
            )}
          </View>
        </Card.Actions>
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
                #{detail.tagName}
              </Subheading>
            </Subheading>
          </View>
          <View style={styled.main}>
            {foodByTag.map(i => (
              <FoodByTag
                key={i.id}
                food={i}
                tagId={tagId}
                navigation={navigation}
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
