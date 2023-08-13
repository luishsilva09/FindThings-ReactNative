import { View, StyleSheet, Text, Alert, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TopBar({ navigation }) {
  return (
    <View style={styles.content}>
      <StatusBar hidden={false} barStyle={"default"}></StatusBar>
      <Ionicons
        name="duplicate-outline"
        size={32}
        color="#fff"
        onPress={() => navigation.navigate("RegisterQR")}
      />
      <Ionicons
        name="exit-outline"
        size={40}
        color="#fff"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#341C3C",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
});
