import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createOdooClient } from "../services/odoo";

export type Auth = {
  dbname: string;
  username: string;
  password?: string;
  url?: string;
};

export function useAuth() {
  const [isAuth, setAuth] = useState(false);
  const verify = async () => {
    const odooSession = await AsyncStorage.getItem("odoo.session");
    setAuth(odooSession !== null);
  };

  const auth = async (auth: Auth) => {
    const odoo = createOdooClient(auth.url);
    const _auth = await odoo.login(
      auth.dbname,
      auth.username,
      auth.password ?? ""
    );

    setAuth(_auth !== null);
  };

  useEffect(() => {
    verify();
  }, []);

  return { isAuth, verify, auth };
}
