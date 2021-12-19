import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Paragraph } from 'react-native-paper';

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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    paddingTop: 10,
    marginLeft: 80,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ActionComment;