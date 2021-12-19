import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Checkbox, Chip, Subheading, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/color.const';
import { _ } from 'lodash';

const FoodClient = () => {
  const { tag } = useSelector(state => state.tag);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState({
    id: 1,
    tagName: 'Phở',
  });
  return (
    <View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
        <Subheading
          style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 18 }}
        >
          Hash Tag:
        </Subheading>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Subheading
            style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 18 }}
          >
            {' '}
            #{active.tagName}
          </Subheading>
        </TouchableOpacity>
      </View>
      {visible && (
        <Modal>
          <Button onPress={() => setVisible(false)}>Đóng </Button>
          <Title>Danh sách Hash Tag </Title>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tag.map((i, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setActive(i), setVisible(false);
                }}
              >
                <Chip
                  selected={
                    tag.indexOf(i) === tag.indexOf(active)
                      ? styled.active
                      : false
                  }
                  selectedColor={
                    tag.indexOf(i) === tag.indexOf(active) ? '#fff' : '#000'
                  }
                  style={
                    tag.indexOf(i) === tag.indexOf(active)
                      ? styled.active
                      : styled.inactive
                  }
                >
                  <Subheading
                    style={[
                      {
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                      },
                      tag.indexOf(i) === tag.indexOf(active)
                        ? { color: '#fff' }
                        : { color: '#000' },
                    ]}
                    mode="outlined"
                  >
                    #{i.tagName}
                  </Subheading>
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styled = StyleSheet.create({
  active: {
    backgroundColor: `${COLORS.blue[1]}`,
    color: '#fff',
    margin: 10,
    paddingHorizontal: 10,
  },
  inactive: {
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default FoodClient;
