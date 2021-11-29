import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { _ } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import {
  favoriteListAction,
  updateFavoriteAction,
} from '../../redux/favorite/favoriteAction.js';
import HeaderShop from '../../shared/HeaderShop.js';
import { styles } from '../../styles/paper.js';

const FavoriteScreen = ({ navigation }) => {
  const { tag } = useSelector(state => state.tag);
  const [tagData, setTagData] = useState([]);
  const [tagSelected, setTagSelected] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateFavoriteAction(_.map(tagSelected, 'id'), navigation));
  };

  const handlerChecked = id => {
    let arr = tagData.map((i, idx) => {
      if (i.id === id) {
        i.isSelected = !i.isSelected;
      }
      return { ...i };
    });
    setTagData(arr);
  };

  useEffect(() => {
    let arr2 = _.filter(tagData, 'isSelected');
    setTagSelected(arr2);
  }, [tagData]);

  useEffect(() => {
    let arr1 = tag.map(i => {
      i.isSelected = false;
      return { ...i };
    });
    setTagData(arr1);
  }, [tag]);

  useEffect(() => {
    dispatch(favoriteListAction());
  }, [dispatch]);
  return (
    <View style={styles.background}>
      <HeaderShop />
      <View style={styled.currentBackground}>
        <Title style={styles.title}>Chọn sở thích của bạn</Title>
        <View style={styled.main}>
          {tagData.map((i, index) => (
            <View key={index} style={{ marginVertical: 5 }}>
              <Chip
                onPress={() => handlerChecked(i.id)}
                mode="outlined"
                selected={i.isSelected ? true : false}
                style={i.isSelected ? styled.active : styled.inactive}
                selectedColor={i.isSelected ? '#fff' : '#000'}
                icon={() => (
                  <Ionicons
                    name="checkbox"
                    size={24}
                    color={i.isSelected ? '#fff' : '#000'}
                  />
                )}
              >
                {i.tagName}
              </Chip>
            </View>
          ))}
        </View>
        {tagSelected.length > 0 && (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Button
              mode="contained"
              color={COLORS.blue[1]}
              icon={() => <MaterialIcons name="save" size={24} color="white" />}
              onPress={() => handleSubmit()}
            >
              Lưu
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  currentBackground: {
    position: 'absolute',
    marginTop: 120,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: -10,
    backgroundColor: `${COLORS.white[1]}`,
  },
  main: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  active: {
    backgroundColor: `${COLORS.blue[1]}`,
    color: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  inactive: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
export default FavoriteScreen;
