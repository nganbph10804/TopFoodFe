import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Portal,
  Provider,
  Subheading,
  TextInput,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants/color.const.js';
import { filterPriceAction } from '../../redux/store/food/actions/foodAction.js';

const FilterModal = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [value, setValue] = useState(0);
  const maxPrice = 1000000;
  const dispatch = useDispatch();
  const handlerFilterPrice = () => {
    dispatch(filterPriceAction(value, maxPrice));
    hideModal();
  };
  return (
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={styled.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <View>
              <Text style={{ fontSize: 20 }}>Danh sách lọc</Text>
            </View>
            <View style={{ position: 'absolute', left: 10 }}>
              <TouchableOpacity
                onPress={hideModal}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={`${COLORS.blue[1]}`}
                />
                <Subheading style={{ color: `${COLORS.blue[1]}` }}>
                  Quay lại
                </Subheading>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styled.main}>
            <Subheading>Giá</Subheading>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 500,
              }}
            >
              <TextInput
                mode="outlined"
                placeholder="Bắt đầu"
                label="Bắt đầu"
                style={{ width: 150 }}
                keyboardType="numeric"
              />
              <Subheading> Đến </Subheading>
              <TextInput
                mode="outlined"
                placeholder="Kết thúc"
                label="Kết thúc"
                style={{ width: 150 }}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Button mode="contained" onPress={() => handlerFilterPrice()}>
              Hoàn tất
            </Button>
          </View>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 5 }} onPress={showModal}>
        Lọc
      </Button>
    </Provider>
  );
};

const styled = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '10000%',
    width: '10000%',
    zIndex: 9999,
  },
  main: {
    marginTop: 30,
    paddingHorizontal: 40,
  },
});
export default FilterModal;
