import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Chip, Paragraph, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { replyListAction } from '../../redux/react/actions/reactAction.js';
import { _ } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import { Ionicons } from '@expo/vector-icons';

const ReplyComment = i => {
  const { reply } = useSelector(state => state.react);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(replyListAction(i.i.id));
  }, []);
  return (
    <View style={styled.reply}>
      <View>
        {!visible && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 80,
            }}
          >
            <Ionicons name="add-circle" size={24} color="black" />
            <Subheading onPress={() => setVisible(!visible)}>
              Xem thêm {reply.length > 0 && reply.length}
            </Subheading>
          </TouchableOpacity>
        )}
        {visible && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 80,
            }}
          >
            <Ionicons name="ios-remove-circle" size={24} color="black" />
            <Subheading onPress={() => setVisible(!visible)}>
              Thu gọn
            </Subheading>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: 'column' }}>
        {reply.map((i, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              flex: 1,
            }}
          >
            <Avatar.Image
              source={{ uri: `${i.profile.profile.avatar}` }}
              size={50}
            />
            <View style={styled.listRep}>
              <View>
                <Subheading style={{ fontWeight: 'bold' }}>
                  {i.profile.profile.name}
                </Subheading>
                <Subheading>{i.content} </Subheading>
              </View>
            </View>
            <View>
              <Subheading>{'\n'} </Subheading>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Paragraph>
                {moment(_.map(reply, 'createAt')).fromNow()}{' '}
              </Paragraph>
              <Chip>Like</Chip>
            </View>
          </View>
        ))}
      </View>
      {/* {visible &&
        reply.map((i, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              width: '100%',
            }}
          >
            <Avatar.Image
              source={{ uri: `${i.profile.profile.avatar}` }}
              size={50}
            />
            <View style={styled.listRep}>
              <View>
                <Subheading style={{ fontWeight: 'bold' }}>
                  {i.profile.profile.name}
                </Subheading>
                <Subheading>{i.content} </Subheading>
              </View>
            </View>
            <View>
              <Subheading>{'\n'} </Subheading>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Paragraph>
                {moment(_.map(reply, 'createAt')).fromNow()}{' '}
              </Paragraph>
              <Chip>Like</Chip>
            </View>
          </View>
        ))} */}
    </View>
  );
};
const styled = StyleSheet.create({
  reply: {
    flex: 1,
    flexDirection: 'column',
  },
  listRep: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    width: 280,
    padding: 10,
  },
});

export default ReplyComment;
