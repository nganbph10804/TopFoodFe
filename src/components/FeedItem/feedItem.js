import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "color";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Caption,
  Surface,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export const FeedItem = (props) => {
  const theme = useTheme();

  const iconColor = color(theme.colors.text).alpha(0.54).rgb().string();

  const contentColor = color(theme.colors.text).alpha(0.8).rgb().string();

  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  return (
    <TouchableRipple onPress={() => props.onPress(props.id)}>
      <Surface style={styles.container}>
        <View style={styles.leftColumn}>
          <Avatar.Image source={{ uri: props.avatar }} size={60} />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.topRow}>
            <Title>{props.name}</Title>
            <Caption style={{ marginTop: -5 }}>{props.date}</Caption>
          </View>
          <Text style={{ color: contentColor, fontSize: 16 }}>
            {props.content}
          </Text>
          <Image
            source={{ uri: props.image }}
            style={[
              styles.image,
              {
                borderColor: imageBorderColor,
              },
            ]}
          />
          <View style={styles.bottomRow}>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 10, bottom: 10 }}
            >
              <View style={styles.iconContainer}>
                <AntDesign name="hearto" size={20} color={iconColor} />
                <Caption style={styles.iconDescription}>
                  {props.hearts} likes
                </Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 10, bottom: 10 }}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color={iconColor}
                />
                <Caption style={styles.iconDescription}>
                  {props.comments} comments
                </Caption>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 15,
    paddingRight: 15,
  },
  leftColumn: {
    width: 100,
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
  },
  topRow: {
    flexDirection: "column",
    alignItems: "baseline",
  },
  handle: {
    marginRight: 3,
  },
  dot: {
    fontSize: 3,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    height: 150,
  },
  bottomRow: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginRight: "10%",
  },
  iconDescription: {
    marginLeft: 5,
    lineHeight: 22,
    fontSize: 12,
  },
});
