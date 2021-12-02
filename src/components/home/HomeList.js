import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Divider, Paragraph, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { reactPostAction } from '../../redux/react/actions/reactAction.js';

const HomeList = ({ feed, navigation }) => {
  const { files, content, tags, id } = feed;
  const dispatch = useDispatch();

  const handlerHeart = () => {
    dispatch(reactPostAction(id));
  };

  return (
    <Card style={{ marginVertical: 10, flexShrink: 1 }}>
      <TouchableOpacity>
        <SliderBox
          images={files}
          sliderBoxHeight={300}
          dotColor={`${COLORS.blue[1]}`}
          inactiveDotColor="#90A4AE"
        />
        <Card.Content style={{ marginBottom: 20 }}>
          <Subheading style={styled.content}>{content}</Subheading>
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
        <Divider />
        <Card.Actions>
          <View style={styled.actionContainer}>
            <TouchableOpacity
              style={styled.action}
              onPress={() => handlerHeart()}
            >
              <AntDesign
                name="heart"
                size={24}
                color={`${COLORS.red[2]}`}
                style={styled.actionItem}
              />
              <Paragraph>Like</Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={styled.action}>
              <FontAwesome5
                name="comment"
                size={24}
                color="black"
                style={styled.actionItem}
              />
              <Paragraph>Bình luận</Paragraph>
            </TouchableOpacity>
          </View>
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
};

const styled = StyleSheet.create({
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  action: {
    flexDirection: 'row',
  },
  actionItem: {
    paddingRight: 10,
  },
  content: { fontSize: 18, marginVertical: 10 },
});
export default HomeList;
