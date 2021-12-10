import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Paragraph, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import ReplyComment from './ReplyComment.js';
import moment from 'moment';

const ActionComment = ({ i, likeComment, handlerSubmit, setCommentId }) => {
  return (
    <View style={styled.main}>
      {i.totalReaction > 0 && (
        <View style={styled.like}>
          <Subheading>{i.totalReaction}</Subheading>
          <AntDesign
            name="like1"
            size={24}
            color={`${COLORS.blue[4]}`}
            onPress={() => likeComment(i.id)}
          />
        </View>
      )}

      <View style={styled.action}>
        <Paragraph style={{ marginLeft: 10 }}>
          {moment(i.createAt).locale('vi').fromNow()}{' '}
        </Paragraph>
        <TouchableOpacity onPress={() => likeComment(i.id)}>
          <Chip onPress={() => likeComment(i.id)}>Likes</Chip>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            handlerSubmit(), setCommentId(i.id);
          }}
        >
          <Chip
            onPress={() => {
              handlerSubmit(), setCommentId(i.id);
            }}
          >
            Phản hồi
          </Chip>
        </TouchableOpacity>
      </View>
      {/* <ReplyComment i={i} /> */}
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    paddingTop: 10,
    alignSelf: 'center',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  like: {
    flexDirection: 'row',
    position: 'absolute',
    right: -60,
    top: -10,
    zIndex: 100,
  },
});

export default ActionComment;
