import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, Text, View, Platform } from "react-native";
import TopBar from "../../components/TopBar";
import Button from "../../components/Button";
import api from "../../services/api";

export default function AddImage(props) {
  const routeData = props.route.params;
  const [token, setToken] = useState();

  async function pickImage() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (result.canceled) return;

    sendFile(result);
  }
  async function selectImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (result.canceled) return;

    sendFile(result);
  }
  async function sendFile(result) {
    const photo = new FormData();
    photo.append("image", {
      name: "teste",
      type:
        Platform.OS === "android"
          ? result.assets[0].type + "/jpeg"
          : result.assets[0].type,
      uri: result.assets[0].uri,
    });

    const config = {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "Multipart/form-data",
      },
    };
    await api
      .post(`/code/addImage/${routeData.refQRCode}`, photo, config)
      .then(() => alert("deu bom"))
      .catch((e) => {
        alert("deu ruim ");
        console.log(e.request._response);
      });
  }
  useEffect(() => {
    const getImagePickerPermissions = async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.getCameraPermissionsAsync();
      setToken(await AsyncStorage.getItem("token"));
    };

    getImagePickerPermissions();
  }, []);
  return (
    <SafeAreaView>
      <TopBar />
      <View>
        <Text>Testssse</Text>
        <Button onPress={pickImage} title={"Take a photo"} />
        <Button onPress={selectImage} title={"Choose a photo"} />
      </View>
    </SafeAreaView>
  );
}
