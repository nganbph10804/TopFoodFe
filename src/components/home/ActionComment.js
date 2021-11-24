import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { replyListAction } from '../../redux/react/actions/reactAction.js';
import ReplyComment from './ReplyComment.js';

const ActionComment = ({ i, likeComment, handlerReply }) => {
  const [show, setShow] = useState(false);
  const { reply } = useSelector(state => state.react);
  console.log(
    'log 🚀 ~ file: ActionComment.js ~ line 13 ~ ActionComment ~ react',
    reply
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(replyListAction(i.id));
  }, []);
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
          onPress={() => likeComment(i.id)}
          style={{ marginLeft: 10 }}
          onPress={() => handlerReply()}
        >
          <Chip
            icon={() => (
              <FontAwesome5
                name="reply-all"
                size={24}
                color={`${COLORS.blue[4]}`}
                onPress={() => likeComment(i.id)}
              />
            )}
            onPress={() => handlerReply()}
          >
            Phản hồi
          </Chip>
        </TouchableOpacity>
      </View>
      {show && (
        <TouchableOpacity style={styled.reply}>
          <Subheading>Xem thêm phản hồi</Subheading>
          <ReplyComment />
        </TouchableOpacity>
      )}
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
  reply: {
    // marginBottom: -30,
  },
});

export default ActionComment;
