import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import BlockList from '../../components/Friend/BlockList.js';
import { COLORS } from '../../constants/color.const.js';
import { blockListAction } from '../../redux/actions/friendAction.js';
import { styles } from '../../styles/paper.js';

const BlockListScreen = ({ navigation }) => {
  const { block } = useSelector(state => state.friend);
  const loading = useSelector(state => state.friend.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(blockListAction(page));
    });
    return focus;
  }, [dispatch, page, navigation]);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={`${COLORS.blue[1]}`}
            size={'large'}
          />
        </View>
      ) : (
        <View style={styles.main}>
          {block.length === 0 ? (
            <View style={styles.noFriend}>
              <Text style={styles.textXL}>Không có bạn bè bị chặn</Text>
            </View>
          ) : (
            <View>
              {block.map((friend, key) => (
                <BlockList key={key} friend={friend} navigation={navigation} />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default BlockListScreen;
