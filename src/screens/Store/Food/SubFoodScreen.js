import { Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Paragraph, Subheading, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import FoodByTag from '../../../components/store/FoodByTag.js';
import { COLORS } from '../../../constants/color.const.js';
import { formatPrice } from '../../../constants/price.const.js';

const SubFoodScreen = ({ navigation, route }) => {
  const { content, name, price, files, id } = route.params.food;
  const details = useSelector(state => state.tag.detail);
  const foodByTag = _.filter(details, i => i.id !== id);
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
