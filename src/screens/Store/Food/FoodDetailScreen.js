import { Entypo } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Paragraph, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FoodByTag from '../../../components/store/FoodByTag.js';
import { COLORS } from '../../../constants/color.const.js';
import { formatPrice } from '../../../constants/price.const.js';
import { getTagId } from '../../../redux/store/tag/action/tagAction.js';
import { _ } from 'lodash';

const FoodDetailScreen = ({ navigation, route }) => {
  const { id, name, content, price, files, tag } = route.params.food;
  const dispatch = useDispatch();
  const { detail } = useSelector(state => state.tag);
  const foodByTag = _.filter(detail, i => i.id !== id);
  useEffect(() => {
    dispatch(getTagId(tag.id));
  }, [dispatch]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Card
        style={{
          marginVertical: 10,
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
              Tag món ăn / {tag.tagName}
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
