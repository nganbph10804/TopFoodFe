import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import {
  Card,
  Chip,
  Subheading,
  Avatar,
  Title,
  Paragraph,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  commentListAction,
  likePostAction,
} from '../../redux/react/actions/reactAction.js';
import Comment from './Comment.js';
import { _ } from 'lodash';
import moment from 'moment';

const HomeList = ({ post, navigation, citySelected }) => {
  const storeId = post.profile.profile.id;
  const { files, content, tags, id, totalReaction, foods } = post;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handlerHeart = () => {
    dispatch(likePostAction(id, citySelected.code));
  };

  useEffect(() => {
    dispatch(commentListAction(id));
  }, [id, dispatch]);

  return (
    <View>
      <Card style={{ marginVertical: 10, backgroundColor: '#f5f5f5' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            marginLeft: 20,
          }}
          onPress={() => navigation.navigate('StoreClient', { storeId })}
        >
          <Avatar.Image
            source={{ uri: `${post.profile.profile.avatar}` }}
            size={60}
          />
          <View>
            <Title style={{ fontWeight: 'bold', marginLeft: 10 }}>
              {post.profile.profile.name}
            </Title>
            <Paragraph style={{ marginLeft: 10 }}>
              {moment(post.time).locale('vi').fromNow()}
            </Paragraph>
          </View>
        </TouchableOpacity>
        <SliderBox
          images={files}
          sliderBoxHeight={300}
          dotColor={`${COLORS.blue[1]}`}
          inactiveDotColor="#90A4AE"
        />
        <Card.Content style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
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
          </View>
          <Subheading style={styled.content}>{content}</Subheading>
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
          <View>
            <Subheading>
              Địa chỉ quán ăn: {post.profile.profile.address}
            </Subheading>
          </View>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <View style={styled.actionContainer}>
            <TouchableOpacity
              style={styled.action}
              onPress={() => handlerHeart()}
            >
              {post.myReaction ? (
                <Chip
                  icon={() => (
                    <AntDesign
                      name="like1"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                      onPress={() => handlerHeart()}
                    />
                  )}
                  onPress={() => handlerHeart()}
                >
                  {totalReaction} Likes
                </Chip>
              ) : (
                <Chip
                  icon={() => (
                    <AntDesign
                      name="like2"
                      size={24}
                      color={`${COLORS.blue[4]}`}
                    />
                  )}
                  onPress={() => handlerHeart()}
                >
                  {totalReaction} Likes
                </Chip>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styled.action}
              onPress={() => setShow(true)}
            >
              <Chip
                icon={() => (
                  <FontAwesome5
                    name="comment"
                    size={24}
                    color="black"
                    style={styled.actionItem}
                  />
                )}
              >
                Bình luận
              </Chip>
            </TouchableOpacity>
          </View>
        </Card.Actions>
      </Card>
      {show && (
        <Comment
          post={post}
          setShow={setShow}
          navigation={navigation}
          handlerHeart={handlerHeart}
        />
      )}
    </View>
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
  content: { fontSize: 18, marginVertical: 10 },
});
export default HomeList;
