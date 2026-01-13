import { AppContext } from "@/src/context/AppContext";
import { useEffect, useMemo, useState } from "react";
import { View, ViewProps } from "react-native";
import { createOdooClient, OdooClient } from "../services/odoo";

export function AppProviderView(props: ViewProps) {
  const [odooENV] = useState<OdooClient>(() => createOdooClient());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await odooENV.init();
      const restored = await odooENV.restoreSession();

      if (!restored) {
        setReady(true)
        console.warn("Need to login");
        return;
      }

      const user = await odooENV.getUser();
      if (user) {
        odooENV.user = user;
      }
      setReady(true);
    })();
  }, []);

  const value = useMemo(
    () => ({ odooENV, ready }),
    [odooENV, ready]
  );

  return (
    <AppContext.Provider value={value}>
      <View {...props}>{props.children}</View>
    </AppContext.Provider>
  );
}
