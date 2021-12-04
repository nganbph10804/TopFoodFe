import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import { Card, Chip, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { deleteFeedAction } from '../../../redux/feed/feedAction.js';
import { _ } from 'lodash';

const FeedList = ({ feed, navigation }) => {
  const { files, content, tags, id, foods, totalReaction } = feed;
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
      onPress: () => {
        navigation.navigate('EditFeedScreen', feed), setIsVisible(false);
      },
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
        <Card.Content style={{ paddingVertical: 20 }}>
          <ScrollView horizontal={true}>
            {tags.map(i => (
              <Subheading
                key={i.id}
                style={{
                  color: `${COLORS.blue[4]}`,
                  marginHorizontal: 5,
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}
              >
                {`#`}
                {i.tagName}
              </Subheading>
            ))}
          </ScrollView>
          <Subheading style={{ fontSize: 18 }}>{content}</Subheading>
          <View style={{ position: 'absolute', right: 30, top: '30%' }}>
            <Chip
              icon={() => (
                <AntDesign name="like1" size={24} color={`${COLORS.blue[4]}`} />
              )}
            >
              {totalReaction} Likes
            </Chip>
          </View>
          {foods.length > 0 && (
            <View>
              <Subheading>Món ăn đính kèm:</Subheading>
              <ScrollView horizontal={true}>
                {foods.map((i, idx) => (
                  <View key={idx} style={{ padding: 5, alignItems: 'center' }}>
                    <Image
                      source={{ uri: `${_.head(i.files)}` }}
                      style={{ width: 80, height: 80, borderRadius: 10 }}
                    />
                    <Subheading>{i.name}</Subheading>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </Card.Content>
      </Card>
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
    </TouchableOpacity>
  );
};

export default FeedList;
