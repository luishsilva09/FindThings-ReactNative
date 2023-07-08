import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import stylesGlobal from "../../components/Styles";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login({ navigation }) {
  const { register, setValue, handleSubmit } = useForm();

  async function onSubmit(data) {
    await api
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then(() => navigation.navigate("Home"))
      .catch((error) => {
        console.log(error.request._response);
        Alert.alert("Erro:" + error.request._response);
      });
  }

  React.useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <KeyboardAwareScrollView extraHeight={120}>
        <View style={styles.content}>
          <Image style={stylesGlobal.imageLogo} source={Logo} />
          <TextInput
            blurOnSubmit={false}
            style={stylesGlobal.input}
            label={"Email"}
            placeholder={"Digite seu email"}
            onChangeText={(text) => setValue("email", text)}
            inputMode="email"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="email"
            onSubmitEditing={() => {
              this.secondInput.focus();
            }}
          />
          <TextInput
            style={stylesGlobal.input}
            label={"Senha"}
            placeholder={"Digite sua senha"}
            secureTextEntry={true}
            onChangeText={(text) => setValue("password", text)}
            autoCorrect={false}
            autoCapitalize="none"
            ref={(input) => {
              this.secondInput = input;
            }}
          />
          <Button
            style={stylesGlobal.button}
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            text={"Continuar"}
          />

          <Text
            style={styles.text}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Ainda não possui cadastro? Cadastra-se aqui
          </Text>
          <Text
            style={styles.text}
            onPress={() => Alert.alert("Em construção")}
          >
            Esqueci a senha
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
  },
});
