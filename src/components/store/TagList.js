import React, { useState } from 'react';
import { Picker, PickerIOSComponent, PickerIOSItem, View } from 'react-native';
import { Chip } from 'react-native-paper';

const TagList = ({ tag, setTagList, tagList }) => {
  const [selected, setSelected] = useState(false);
  const handlerSelected = id => {
    setSelected(!selected);
    if (!selected) return setTagList(id);
    else return setSelected(null);
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* <Chip
        mode="flat"
        selected={selected}
        style={{ marginHorizontal: 5 }}
        onPress={() => handlerSelected(tag.id)}
      >
        {tag.tagName}
      </Chip> */}
      <Picker>
        <Picker.Item label={tag.tagName} value={tag.id} />
      </Picker>
    </View>
  );
};

export default TagList;
