import Logo from "@/src/assets/images/logo.png";
import { useAppContext } from "@/src/context/AppContext";
import { AppProviderView } from "@/src/provider/AppProviderView";
import { enableLayoutAnimationExperimental } from "@/src/tools";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform
} from "react-native";
import Config from "./configcontrol";
import LoginView from "./logincontrol";

type Cred = {
  username: string;
  password: string;
};

export function Login() {
  const [initDataSaved, setInitData] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const { odooENV, ready } = useAppContext();

  const toggle = (e: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setInitData(e);
  };

  const saveData = ({ ODOO_URL, ODOO_DB }: any) => {
    const showAlert = (title: string, msg: string) => Alert.alert(title, msg);
    if (!ODOO_URL) return showAlert("Falta info", "Debe de definir una URL");
    if (!ODOO_DB) return showAlert("Falta Info", "Debe de definir una Base de datos.");

    odooENV.url = ODOO_URL
    odooENV.db = ODOO_DB
    toggle(true);
  };

  const authenticate = async ({ username, password }: Cred) => {
    const auth = await odooENV.login(odooENV.db, username, password);
    if (auth.result) {
      setAuth(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (odooENV) {
        odooENV.url && setInitData(true);
      }
      enableLayoutAnimationExperimental();
    })()
  }, [ready]);

  useEffect(() => {
    if (odooENV && odooENV.uid) {
      setAuth(true)
    }
  }, [ready])

  useEffect(() => {
    if (isAuth) return router.replace("/app")
  }, [isAuth])

  return (
    <>
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
    </>
  );
}

export default function AppLogin() {
  return (
    <AppProviderView className="flex-1 justify-center items-center w-[100%] bg-white">
      <Login />
    </AppProviderView>
  )
}