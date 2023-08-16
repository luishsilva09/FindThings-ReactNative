import { View, StyleSheet, Text, Alert, StatusBar, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../assets/logo.png";
import stylesGlobal from "../components/Styles";

export default function TopBar({ navigation }) {
  async function exit() {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }
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
        onPress={() => exit()}
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
