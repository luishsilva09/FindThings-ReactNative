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

export default function Signup({ navigation }) {
  const { register, setValue, handleSubmit } = useForm();

  async function onSubmit(data) {
    await api
      .post("/register", {
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
      })
      .then(() => navigation.navigate("Login"))
      .catch((error) => {
        Alert.alert("Erro: " + error.request._response);
      });
  }

  React.useEffect(() => {
    register("email");
    register("password");
    register("repeatPassword");
  }, [register]);

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <Image style={stylesGlobal.imageLogo} source={Logo} />
          <TextInput
            style={stylesGlobal.input}
            label={"Email"}
            placeholder={"Digite seu email"}
            onChangeText={(text) => setValue("email", text)}
            inputMode="email"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="email"
            blurOnSubmit={false}
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
            blurOnSubmit={false}
            ref={(input) => {
              this.secondInput = input;
            }}
            onSubmitEditing={() => {
              this.thirdInput.focus();
            }}
          />
          <TextInput
            style={stylesGlobal.input}
            label={"Repetir senha"}
            placeholder={"Repita sua senha"}
            secureTextEntry={true}
            onChangeText={(text) => setValue("repeatPassword", text)}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            ref={(input) => {
              this.thirdInput = input;
            }}
          />
          <Button
            style={stylesGlobal.button}
            title="Cadastrar"
            onPress={handleSubmit(onSubmit)}
            text={"Continuar"}
          />

          <Text
            style={styles.text}
            onPress={() => navigation.navigate("Login")}
          >
            Já possui cadastro? Entre aqui
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
