import { Text, StyleSheet, View, Image } from "react-native";
import Logo from "../assets/logoIcon.png";
import Button from "./Button";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

export default function ScanButton({ setValue }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    //pegando permissao
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  //confirmando permissao
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setValue(data);
  };

  return (
    <View style={styles.content}>
      {scanned ? (
        load ? (
          <Text>carregando</Text>
        ) : (
          <>
            <Image source={Logo} style={styles.image} />
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          </>
        )
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          height={295}
          width={345}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#341C3C",
    height: 300,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    borderWidth: 4,
    height: 250,
    borderStyle: "solid",
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "red",
  },
  image: {
    flex: 1,
    height: 400,
    width: 400,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
