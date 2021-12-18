import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Paragraph, Subheading } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import ReplyComment from './ReplyComment.js';

const ActionComment = ({ i, likeComment, handlerSubmit, setCommentId }) => {
  return (
    <View style={styled.main}>
      <View style={styled.action}>
        <Paragraph style={{ marginLeft: 10 }}>
          {moment(i.createAt).fromNow()}{' '}
        </Paragraph>
        <TouchableOpacity onPress={() => likeComment(i.id)}>
          <Chip onPress={() => likeComment(i.id)}>Like</Chip>
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
        {/* <ReplyComment i={i} /> */}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    paddingTop: 10,
    // alignSelf: 'center',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ActionComment;
