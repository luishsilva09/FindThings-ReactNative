import React from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Card({ data, navigation }) {
  return (
    <View style={styles.content}>
      <Text>{data.tagName}</Text>
      <Ionicons
        name="images-outline"
        size={32}
        color="#fff"
        onPress={() => navigation.navigate("AddImage", data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: 90,
    width: "95%",
    backgroundColor: "#84ACD2",
    borderRadius: 20,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
