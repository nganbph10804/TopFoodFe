import { AntDesign, Entypo } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Card, Chip, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/color.const.js';
import { deleteFeedAction } from '../../../redux/feed/feedAction.js';

const FeedList = ({ feed, navigation, storeId }) => {
  const account = useSelector(state => state.auth.account);
  const { files, content, tags, id, foods, totalReaction } = feed;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const handlerRemove = () => {
    dispatch(deleteFeedAction(id));
  };

  return (
    <Card style={{ marginVertical: 15 }}>
      <SliderBox
        images={files}
        sliderBoxHeight={300}
        dotColor={`${COLORS.blue[1]}`}
        inactiveDotColor="#90A4AE"
      />
      {storeId === account.id && (
        <View style={styled.menu}>
          <Menu
            visible={visible}
            anchor={
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color="black"
                onPress={showMenu}
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                navigation.navigate('EditFeedScreen', feed);
              }}
            >
              Cập nhật
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                handlerRemove();
              }}
            >
              Xoá
            </MenuItem>
          </Menu>
        </View>
      )}
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
      <Card.Actions>
        {totalReaction > 0 && (
          <View style={styled.like}>
            <Chip
              icon={() => (
                <AntDesign name="like1" size={24} color={`${COLORS.blue[4]}`} />
              )}
            >
              {totalReaction}
            </Chip>
          </View>
        )}
      </Card.Actions>
    </Card>
  );
};

const styled = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 30,
    top: 20,
  },
  like: { position: 'absolute', right: 30, top: '30%' },
});

export default FeedList;
