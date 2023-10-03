import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

export default function ImageCard({ data }) {
  const [imageLoad, setImageLoad] = useState(false);

  function onLoading(value) {
    setImageLoad(value);
  }
  return (
    <View>
      {imageLoad && (
        <View>
          <ActivityIndicator
            color={"#341C3C"}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      )}
      {
        <Image
          key={data.id}
          source={{
            uri: data.url,
          }}
          style={{ width: 180, height: 180, margin: 5 }}
          onLoadStart={() => onLoading(true)}
          onLoadEnd={() => onLoading(false)}
        />
      }
    </View>
  );
}
