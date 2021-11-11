import React from 'react';
import { Text } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';

const HomeList = ({ feed, navigation }) => {
  const { files, content, tags, id } = feed;

  return (
    <Card style={{ marginVertical: 10 }}>
      <SliderBox
        images={files}
        sliderBoxHeight={300}
        dotColor={`${COLORS.blue[1]}`}
        inactiveDotColor="#90A4AE"
      />
      <Card.Content style={{ marginBottom: 20 }}>
        <Subheading style={{ fontSize: 18 }}>{content}</Subheading>
        {tags.map(i => (
          <Text
            key={i.id}
            style={{
              color: `${COLORS.purple[3]}`,
              fontSize: 17,
            }}
          >
            {`#`}
            {i.tagName}
          </Text>
        ))}
      </Card.Content>
    </Card>
  );
};

export default HomeList;
