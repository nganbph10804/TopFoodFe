import { _ } from 'lodash';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { replyListAction } from '../../redux/react/actions/reactAction.js';

const ReplyComment = i => {
  // const { reply } = useSelector(state => state.react);
  // console.log(_.map(reply, 'id'));
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(replyListAction(i.i.id));
  // }, []);
  return (
    <TouchableOpacity style={styled.reply}>
      <Subheading>Xem thêm phản hồi</Subheading>
    </TouchableOpacity>
  );
};
const styled = StyleSheet.create({
  reply: {},
});

export default ReplyComment;
