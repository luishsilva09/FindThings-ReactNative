import react from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Card({ data }) {
  return (
    <View style={styles.content}>
      <Text>{data.tagName}</Text>
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
  },
});
