import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const { onPress, title = "Save", buttonColor = "#84ACD2" } = props;
  return (
    <Pressable style={styles(buttonColor).button} onPress={onPress}>
      <Text style={styles().text}>{title}</Text>
    </Pressable>
  );
}

const styles = (buttonColor) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 60,
      borderRadius: 29,
      elevation: 3,
      marginBottom: 30,
      backgroundColor: buttonColor,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: "white",
    },
  });
