import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { Feed } from "../components/FeedItem/feedItem";
import { dataFeed } from "./../components/FeedItem/dataFeed";
import { StackNavigatorParamlist } from "./../components/FeedItem/type";

type TwittProps = React.ComponentProps<typeof Feed>;

function renderItem({ item }: { item: TwittProps }) {
  return <Feed {...item} />;
}

function keyExtractor(item: TwittProps) {
  return item.id.toString();
}

type Props = {
  navigation?: StackNavigationProp<StackNavigatorParamlist>,
};

export const FeedScreen = (props: Props) => {
  const theme = useTheme();
  const data = dataFeed.map((twittProps) => ({
    ...twittProps,
    onPress: () => {},
  }));
  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      style={{ backgroundColor: theme.colors.background }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{ height: StyleSheet.hairlineWidth }} />
      )}
    />
  );
};
