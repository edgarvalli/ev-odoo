import AsyncStorage from "@react-native-async-storage/async-storage";
import { createOdooClient } from "./odoo";

export async function startAuth(username: string, password: string) {
  const url = await AsyncStorage.getItem("ODOO_URL");
  const db = await AsyncStorage.getItem("ODOO_DB");

  if (!url || !db) return false;

  const odoo = createOdooClient(url);

  const isAuth = await odoo.login(db, username, password);

  if (isAuth.error) {
    console.warn(isAuth.error.message);
    return false;
  }

  return true;
}
