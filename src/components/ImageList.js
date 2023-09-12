import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import api from "../services/api";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageCard from "./ImageCard";

export default function ImageList(props) {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
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
          });
      });
    };
    getData();
  }, []);

  const num = 2;
  return (
    <SafeAreaView>
      <View style={styles.containerList}>
        <FlatList
          horizontal={false}
          data={data}
          renderItem={({ item }) => <ImageCard data={item} />}
          numColumns={num}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerList: {
    flex: 0,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
