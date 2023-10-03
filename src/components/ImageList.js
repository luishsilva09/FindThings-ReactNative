import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import api from "../services/api";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageCard from "./ImageCard";

export default function ImageList(props) {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const getData = async () => {
    await AsyncStorage.getItem("token").then(async (e) => {
      await api
        .get(`/code/listContent/${props.data.id}`, {
          headers: {
            authorization: "Bearer " + e,
          },
        })
        .then((e) => {
          setData(e.data);
          setLoad(false);
          setRefresh(false);
        });
    });
  };
  useEffect(() => {
    getData();
  }, [props.load]);

  const num = 2;

  function onRefresh() {
    setRefresh(true);
    getData();
  }

  const emptyList = ({ item }) => {
    return <Text>Não tem imagens ainda</Text>;
  };
  return (
    <SafeAreaView>
      <View style={styles.containerList}>
        <FlatList
          style={{ height: 540 }}
          data={data}
          ListEmptyComponent={emptyList}
          renderItem={({ item }) => <ImageCard data={item} />}
          numColumns={num}
          onRefresh={() => {
            onRefresh();
          }}
          refreshing={refresh}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerList: {
    flex: 0,
    alignItems: "center",
    marginBottom: 40,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});
