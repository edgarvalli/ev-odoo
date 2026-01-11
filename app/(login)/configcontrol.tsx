import { Button, Control } from "@/src/components";
import { OdooConfig } from "@/src/types/odoo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { IEvents } from "./types";

export default function Config(props: IEvents) {
  const [ODOO_URL, setUrl] = useState("");
  const [ODOO_DB, setDBName] = useState("");

  const getInitData = async () => {
    const url = await AsyncStorage.getItem("ODOO_URL");
    const dbname = await AsyncStorage.getItem("ODOO_DB");
    setUrl(url ?? "");
    setDBName(dbname ?? "");
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <>
      <Control
        className="mb-10"
        iconName="https"
        label="Url Odoo"
        keyboardType="url"
        enterKeyHint="next"
        placeholder="https://app.odoo.com"
        placeholderTextColor={"#9b9b9b"}
        textContentType="URL"
        value={ODOO_URL}
        onChangeText={(val) => setUrl(val)}
      />
      <Control
        className="mb-2"
        iconName="dataset"
        label="Base de datos"
        enterKeyHint="done"
        placeholder="DBName"
        placeholderTextColor={"#9b9b9b"}
        value={ODOO_DB}
        onChangeText={(val) => setDBName(val)}
      />
      <Button
        label="Guardar"
        className="w-[60%] mt-10 m-auto"
        onPress={() => props.onPress?.({ ODOO_URL, ODOO_DB } as OdooConfig)}
      />
    </>
  );
}