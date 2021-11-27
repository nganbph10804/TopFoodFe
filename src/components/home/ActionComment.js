import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';
import ReplyComment from './ReplyComment.js';

const ActionComment = ({ i, likeComment, handlerSubmit, setCommentId }) => {
  return (
    <View style={styled.main}>
      <View style={styled.action}>
        <TouchableOpacity onPress={() => likeComment(i.id)}>
          <Chip
            icon={() => (
              <AntDesign
                name="like1"
                size={24}
                color={`${COLORS.blue[4]}`}
                onPress={() => likeComment(i.id)}
              />
            )}
            onPress={() => likeComment(i.id)}
          >
            {i.totalReaction} Likes
          </Chip>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            handlerSubmit(), setCommentId(i.id);
          }}
        >
          <Chip
            icon={() => (
              <FontAwesome5
                name="reply-all"
                size={24}
                color={`${COLORS.blue[4]}`}
                onPress={() => {
                  handlerSubmit(), setCommentId(i.id);
                }}
              />
            )}
            onPress={() => {
              handlerSubmit(), setCommentId(i.id);
            }}
          >
            Phản hồi
          </Chip>
        </TouchableOpacity>
      </View>
      <ReplyComment i={i} />
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
  },
});

export default ActionComment;
