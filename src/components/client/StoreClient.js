import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Avatar, Button, Card, Subheading, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  followAction,
  unFollowAction,
} from '../../redux/follow/followAction.js';
import { getProfileStoreAction } from '../../redux/store/profile/profileAction.js';
import FoodClient from './FoodClient.js';
import PostClient from './PostClient.js';

const StoreClient = ({ route, navigation }) => {
  const { storeId } = route.params;
  const { profile } = useSelector(state => state.storeProfile);
  const dispatch = useDispatch();

  const [toggleTab, setToggleTab] = useState(1);

  const follow = () => {
    dispatch(followAction(storeId));
  };

  const unFollow = () => {
    dispatch(unFollowAction(storeId));
  };

  useEffect(() => {
    dispatch(getProfileStoreAction(storeId));
  }, [dispatch, storeId]);

  return (
    <ScrollView style={styled.main}>
      <View
        style={{
          paddingLeft: 30,
          paddingVertical: 10,
          backgroundColor: 'white',
        }}
      >
        <View>
          <View style={styled.card}>
            <Avatar.Image source={{ uri: `${profile.avatar}` }} size={100} />
            <View style={{ marginLeft: 10 }}>
              <Title style={{ fontSize: 22 }}>{profile.name} </Title>
              {profile.myFollow ? (
                <View>
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
                <View>
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
            {profile.follower > 0 && (
              <Subheading style={styled.text}>
                {profile.follower} Đang Follow
              </Subheading>
            )}
          </View>
        </View>
        <View>
          <Subheading
            style={{
              alignSelf: 'center',
              fontStyle: 'italic',
              marginVertical: 10,
            }}
          >
            {profile.bio}
          </Subheading>
          <Divider />
          <Subheading style={{ fontWeight: 'bold', marginTop: 10 }}>
            SĐT:{'\r'}
            <Subheading>{profile.phone}</Subheading>
          </Subheading>
          <Subheading style={{ fontWeight: 'bold' }}>
            Địa chỉ: {'\r'}
            <Subheading>{profile.address}</Subheading>
          </Subheading>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={toggleTab === 1 ? styled.active : styled.inactive}>
          <Button onPress={() => setToggleTab(1)}>Món ăn </Button>
        </View>
        <View style={toggleTab === 2 ? styled.active : styled.inactive}>
          <Button onPress={() => setToggleTab(2)}>Bài viết </Button>
        </View>
      </View>

      {toggleTab === 1 && (
        <View>
          <FoodClient storeId={storeId} navigation={navigation} />
        </View>
      )}
      {toggleTab === 2 && (
        <View>
          <PostClient storeId={storeId} navigation={navigation} />
        </View>
      )}
    </ScrollView>
  );
};

const styled = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: `${COLORS.white[1]}`,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  active: {
    width: '50%',
    backgroundColor: 'white',
    borderTopWidth: 4,
    borderTopColor: `${COLORS.blue[1]}`,
  },
  inactive: {
    width: '50%',
    backgroundColor: '#808080',
  },
});
export default StoreClient;
