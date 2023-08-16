import { SafeAreaView, Text, TextInput } from "react-native";
import ScanButton from "../../components/ScanButton";
import TopBar from "../../components/TopBar";
import Button from "../../components/Button";
import stylesGlobal from "../../components/Styles";
import { useState, useEffect } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "react-native-modal-loader";

export default function RegisterQR({ navigation }) {
  const [load, setLoad] = useState(false);
  const [refCode, setRefCode] = useState("QR code");

  const { register, setValue, handleSubmit } = useForm();

  async function onSubmit(data) {
    setLoad(true);
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: { authorization: "Bearer " + token },
    };

    await api
      .post(
        "/code/register",
        { refQRCode: refCode, tagName: data.tagName },
        config
      )
      .then(() => {
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        alert("Verifique os dados");
      });
  }
  useEffect(() => {
    register("tagName");
  }, [register]);
  return (
    <SafeAreaView>
      <Loader loading={load} />
      <KeyboardAwareScrollView extraHeight={120}>
        <TopBar navigation={navigation}></TopBar>
        <Text>Registro de qr code</Text>
        <ScanButton setValue={setRefCode}></ScanButton>

        <TextInput
          style={stylesGlobal.input}
          editable={false}
          value={refCode}
        ></TextInput>
        <TextInput
          style={stylesGlobal.input}
          label={"TagName"}
          placeholder="Nome da TAG"
          onChangeText={(text) => setValue("tagName", text)}
        ></TextInput>
        <Button title="Registrar" onPress={handleSubmit(onSubmit)}></Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
