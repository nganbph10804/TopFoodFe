import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, Paragraph, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { replyListAction } from '../../redux/react/actions/reactAction.js';
import { _ } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';

const ReplyComment = i => {
  const { reply } = useSelector(state => state.react);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(replyListAction(i.i.id));
  }, []);
  return (
    <View style={styled.reply}>
      {!visible && (
        <Subheading onPress={() => setVisible(!false)}>Xem thêm</Subheading>
      )}
      {visible &&
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
            <Image
              source={{ uri: `${i.profile.profile.avatar}` }}
              style={{ width: 60, height: 60 }}
            />
            <Card style={styled.listRep}>
              <Card.Content>
                <Subheading style={{ fontWeight: 'bold' }}>
                  {i.profile.profile.name}
                </Subheading>
                <Subheading>{i.content} </Subheading>
              </Card.Content>
              <Card.Actions></Card.Actions>
            </Card>
            <View>
              <Paragraph>
                {moment(_.map(reply, 'createAt')).fromNow()}{' '}
              </Paragraph>
              <Chip>Like </Chip>
            </View>
          </View>
        ))}
    </View>
  );
};
const styled = StyleSheet.create({
  reply: {},
  listRep: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
});

export default ReplyComment;
