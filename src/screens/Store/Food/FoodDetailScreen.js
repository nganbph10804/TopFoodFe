import { AntDesign, Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect, useState } from 'react';
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
import { getTagId } from '../../../redux/store/tag/action/tagAction.js';
import {
  unVoteFoodAction,
  voteFoodAction,
} from '../../../redux/vote/voteAction.js';
import { styles } from '../../../styles/paper.js';

const FoodDetailScreen = ({ navigation, route }) => {
  const { id, name, content, price, files, tag, myReaction, totalReaction } =
    route.params.food;
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.account.role);
  const { detail } = useSelector(state => state.tag);
  const { loading } = useSelector(state => state.voteFood);
  const foodByTag = _.filter(detail, i => i.id !== id);

  const handlerVote = id => {
    dispatch(voteFoodAction(id));
  };

  const handlerUnVote = id => {
    dispatch(unVoteFoodAction(id));
  };

  useEffect(() => {
    dispatch(getTagId(tag.id));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
              {myReaction && (
                <Chip onPress={() => handlerUnVote(id)}>
                  <AntDesign
                    name="star"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
                  <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                    {totalReaction} votes
                  </Subheading>
                </Chip>
              )}
              {role === 'ROLE_STORE' && (
                <Chip onPress={() => handlerUnVote(id)}>
                  <AntDesign
                    name="star"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
                  <Subheading style={{ color: `${COLORS.blue[4]}` }}>
                    {totalReaction} votes
                  </Subheading>
                </Chip>
              )}
              {!myReaction && role === 'ROLE_USER' && (
                <Chip onPress={() => handlerVote(id)}>
                  <AntDesign
                    name="staro"
                    size={24}
                    color={`${COLORS.blue[4]}`}
                  />
                  <Subheading style={{ color: `#000` }}>
                    {totalReaction} votes
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
              <Entypo
                name="price-tag"
                size={24}
                color={`${COLORS.purple[3]}`}
              />
              <Subheading
                style={{ paddingLeft: 10, color: `${COLORS.purple[3]}` }}
              >
                Tag món ăn: #{tag.tagName}
              </Subheading>
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
