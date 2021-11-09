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
          mode="flat"
          selected={active === -1 ? styled.active : false}
          style={active === -1 ? styled.active : styled.inactive}
          onPress={() => {
            setActive(-1);
            handlerFilter('ALL');
          }}
        >
          Tất cả
        </Chip>
        {data.map(c => (
          <Chip
            key={c.id}
            mode="flat"
            selected={data.indexOf(c) === active ? styled.active : false}
            style={data.indexOf(c) === active ? styled.active : styled.inactive}
            onPress={() => handlerSelected(c)}
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
    backgroundColor: `${COLORS.blue[5]}`,
    color: '#fff',
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  inactive: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
});
export default TagList;
