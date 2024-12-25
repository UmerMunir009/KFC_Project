import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface MenuItemProps {
  title: string;
  image: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export default function MenuItem({
  title,
  image,
  onPress,
  containerStyle,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 10,
    overflow: "hidden",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
