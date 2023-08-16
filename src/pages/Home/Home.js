import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import TopBar from "../../components/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Home({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: { authorization: "Bearer " + token },
    };
    await api
      .get("/code/listQRcode", config)
      .then((e) => {
        setUserData(e.data);

        setRefreshing(false);
      })
      .catch(() => setRefreshing(false));
  }

  return (
    <SafeAreaView>
      <TopBar navigation={navigation}></TopBar>
      <ScrollView
        contentContainerStyle={styles.mainContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {userData.map((data, index) => (
          <Card key={index} data={data} navigation={navigation} />
        ))}
        <Button onPress={() => navigation.navigate("AddImage")}></Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#84acd2",
    width: "90%",
    height: 60,
    borderRadius: 29,
    margin: 20,
    padding: 10,
  },
  mainContent: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
});
