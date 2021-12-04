import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { Avatar, Button, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  followAction,
  unFollowAction,
} from '../../redux/follow/followAction.js';
import { foodListAction } from '../../redux/store/food/actions/foodAction.js';
import { getProfileStoreAction } from '../../redux/store/profile/profileAction.js';
import FilterCtg from '../store/FilterCtg.js';
import FoodList from '../store/FoodList.js';
import TagList from '../store/TagList.js';
import { _ } from 'lodash';
import { storeFeedListAction } from '../../redux/feed/feedAction.js';
import FeedList from '../store/feed/FeedList.js';

const StoreClient = ({ route, navigation }) => {
  const { storeId } = route.params;
  const { profile } = useSelector(state => state.storeProfile);
  const tags = useSelector(state => state.food.tagName);
  const { listUserFollowStore } = useSelector(state => state.follow);
  const food = useSelector(state => state.food.food);
  const { feed } = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const { tag } = useSelector(state => state.tag);
  const [ctg, setCtg] = useState();
  const [tagId, setTagId] = useState();
  const [tagData, setTagData] = useState([]);

  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(-1);

  const follow = () => {
    dispatch(followAction(storeId));
  };

  const unFollow = () => {
    dispatch(unFollowAction(storeId));
  };

  const handlerFilter = id => {
    if (id === 'ALL') {
      dispatch(foodListAction(storeId));
      setCtg(false);
    } else {
      setTagId(id);
      setCtg(true);
    }
  };

  useEffect(() => {
    dispatch(getProfileStoreAction(storeId));
    dispatch(foodListAction(storeId));
    dispatch(storeFeedListAction(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    if (tagId) {
      let data = _.filter(food, i => i.tag.id === tagId);
      setTagData(data);
    }
  }, [tagId]);
  return (
    <View style={styled.main}>
      <View style={{ marginTop: 10, marginLeft: 30, marginBottom: 10 }}>
        <View style={styled.card}>
          <Avatar.Image source={{ uri: `${profile.avatar}` }} />
          <View style={{ marginLeft: 10 }}>
            <Title>{profile.name} </Title>
          </View>
          <View style={{ position: 'absolute', right: '10%' }}>
            {profile.myFollow ? (
              <View style={{ alignItems: 'flex-start' }}>
                <Button
                  mode="outlined"
                  color={`${COLORS.red[3]}`}
                  onPress={() => unFollow()}
                  style={{ borderColor: `${COLORS.red[3]}` }}
                >
                  Bỏ theo dõi
                </Button>
              </View>
            ) : (
              <View style={{ alignItems: 'flex-start' }}>
                <Button
                  mode="outlined"
                  onPress={() => follow()}
                  color={`${COLORS.blue[1]}`}
                  style={{ borderColor: `${COLORS.blue[1]}` }}
                >
                  Theo dõi
                </Button>
              </View>
            )}
          </View>
        </View>
        <View>
          <Subheading style={styled.text}>
            {listUserFollowStore.length} người theo dõi
          </Subheading>
          <Subheading>SĐT: {profile.phone} </Subheading>
          <Subheading>Địa chỉ: {profile.address} </Subheading>
        </View>
      </View>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Món ăn"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Bài viết"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <ScrollView>
            <ScrollView
              horizontal={true}
              style={{
                backgroundColor: '#aec4e6',
                marginVertical: 5,
                paddingVertical: 10,
              }}
            >
              <TagList
                data={tag}
                active={active}
                setActive={setActive}
                handlerFilter={handlerFilter}
              />
            </ScrollView>
            {!ctg && (
              <View>
                {food.length < 1 ? null : (
                  <View style={{ flex: 1 }}>
                    {food.map(i => (
                      <FoodList key={i.id} food={i} navigation={navigation} />
                    ))}
                  </View>
                )}
              </View>
            )}
            {ctg && (
              <View style={{ flex: 1 }}>
                {tagData.map(i => (
                  <FilterCtg
                    key={i.id}
                    foods={i}
                    navigation={navigation}
                    tagName={tags}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <ScrollView>
            {feed.map((i, index) => (
              <FeedList key={index} feed={i} navigation={navigation} />
            ))}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styled = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: `${COLORS.white[1]}`,
  },
  card: { flexDirection: 'row', alignItems: 'center', width: '100%' },
});
export default StoreClient;
