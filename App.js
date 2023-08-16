import * as React from "react";
import Login from "./src/pages/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./src/pages/Signup/Signup";
import Home from "./src/pages/Home/Home";
import RegisterQR from "./src/pages/RegisterQR/RegisterQR";
import AddImage from "./src/pages/AddImage/AddImage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Signup} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RegisterQR" component={RegisterQR} />
          <Stack.Screen name="AddImage" component={AddImage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
