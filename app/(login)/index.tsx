import Logo from "@/src/assets/images/logo.png";
import odooRPC from "@/src/services/odoorpc";
import { OdooConfig } from "@/src/types/odoo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
import Config from "./configcontrol";
import LoginView from "./logincontrol";

type Cred = {
  username: string;
  password: string;
};

export default function Login() {
  const [initDataSaved, setInitData] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const toggle = (e: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setInitData(e);
  };

  const saveData = ({ ODOO_URL, ODOO_DB }: OdooConfig) => {
    if (!ODOO_URL) return Alert.alert("Falta info", "Debe de definir una URL");
    if (!ODOO_DB)
      return Alert.alert("Falta Info", "Debe de definir una Base de datos.");

    AsyncStorage.setItem("ODOO_URL", ODOO_URL);
    AsyncStorage.setItem("ODOO_DB", ODOO_DB);
    toggle(true);
  };

  const authenticate = async ({ username, password }: Cred) => {
    const url = await AsyncStorage.getItem("ODOO_URL");
    const dbname = await AsyncStorage.getItem("ODOO_DB");
    if (!url) return Alert.alert("Alerta", "No hay una url configurada.");
    if (!dbname)
      return Alert.alert("Alerta", "No hay una base de datos configurada.");

    const odoo = odooRPC(url);
    odoo.dbname = dbname;
    const resp = await odoo.login<number>(username, password);
    if (resp.result) {
      await AsyncStorage.setItem("ODOO_UID", resp.result.toString());
      await AsyncStorage.setItem("ODOO_PASS", password);
      setAuth(true);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("ODOO_URL").then((url) => {
      setInitData(() => (url ? true : false));
    });
  }, []);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    const loadAuth = async () => {
      const uid = await AsyncStorage.getItem("ODOO_UID");
      setAuth(!!uid);
    };

    loadAuth();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("ODOO_URL").then((url) => {
      if (!url) return setInitData(false);
    });
  }, []);

  if (isAuth) return <Redirect href="/dashboard" />;

  return (
    <View className="flex-1 justify-center items-center w-[100%] bg-white">
      <Image
        className="mb-10 -mt-20"
        source={Logo}
        style={{ width: 150, height: 150 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="w-[80%]"
      >
        {initDataSaved ? (
          <LoginView onPress={(val) => authenticate(val as Cred)} onEditPress={() => setInitData(false)} />
        ) : (
          <Config onPress={saveData} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
