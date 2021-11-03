import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { foodListAction } from '../../../redux/store/actions/storeAction.js';

const FoodListScreen = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.store);
  useEffect(() => {
    dispatch(foodListAction());
  }, [dispatch]);
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          //   left={LeftContent}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default FoodListScreen;
