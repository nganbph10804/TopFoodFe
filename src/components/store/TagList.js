import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { COLORS } from '../../constants/color.const.js';

const TagList = ({ setActive, active, data, handlerFilter }) => {
  const handlerSelected = tag => {
    setActive(data.indexOf(tag));
    handlerFilter(tag.id);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Chip
          mode="outlined"
          selected={active === -1 ? styled.active : false}
          style={active === -1 ? styled.active : styled.inactive}
          onPress={() => {
            setActive(-1);
            handlerFilter('ALL');
          }}
          selectedColor={active === -1 ? '#fff' : '#000'}
          icon={() => (
            <Ionicons
              name="checkbox"
              size={24}
              color={active === -1 ? '#fff' : '#000'}
            />
          )}
        >
          Tất cả
        </Chip>
        {data.map(c => (
          <Chip
            key={c.id}
            mode="outlined"
            selected={data.indexOf(c) === active ? styled.active : false}
            style={data.indexOf(c) === active ? styled.active : styled.inactive}
            onPress={() => handlerSelected(c)}
            selectedColor={data.indexOf(c) === active ? '#fff' : '#000'}
            icon={() => (
              <Ionicons
                name="checkbox"
                size={24}
                color={data.indexOf(c) === active ? '#fff' : '#000'}
              />
            )}
          >
            {c.tagName}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
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
export default TagList;
