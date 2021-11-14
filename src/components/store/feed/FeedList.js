import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { deleteFeedAction } from '../../../redux/store/feed/actions/feedAction.js';

const FeedList = ({ feed, navigation }) => {
  const { files, content, tags, id } = feed;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const handlerOption = () => {
    setIsVisible(true);
  };
  const handlerRemove = () => {
    dispatch(deleteFeedAction(id));
    setIsVisible(false);
  };

  const list = [
    {
      title: 'Cập nhật',
      titleStyle: { color: `${COLORS.blue[1]}` },
      onPress: () => navigation.navigate('EditFeedScreen', feed),
    },
    {
      title: 'Xoá',
      titleStyle: { color: 'red' },
      onPress: () => handlerRemove(),
    },
    {
      title: 'Cancel',
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <TouchableOpacity onLongPress={handlerOption}>
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
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </Card>
    </TouchableOpacity>
  );
};

export default FeedList;
