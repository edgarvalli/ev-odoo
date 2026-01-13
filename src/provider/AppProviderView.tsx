import { AppContext } from "@/src/context/AppContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, ViewProps } from "react-native";
import { createOdooClient, OdooClient } from "../services/odoo";
import { IMenuItem } from "../types/menuItem";

export function AppProviderView(props: ViewProps) {
  const [odooENV] = useState<OdooClient>(() => createOdooClient());
  const [currentMenuItem, setCurrentMenuItemState] =
    useState<IMenuItem | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await odooENV.init();

      const restored = await odooENV.restoreSession();
      if (!restored) {
        console.warn("Need to login");
        setReady(true);
        return;
      }

      const user = await odooENV.getUser();
      if (user) {
        odooENV.user = user;
      }

      setReady(true);
    })();
  }, [odooENV]);

  const setCurrentMenuItem = useCallback((menu: IMenuItem) => {
    setCurrentMenuItemState(menu);
  }, []);

  const value = useMemo(
    () => ({
      odooENV,
      ready,
      currentMenuItem,
      setCurrentMenuItem,
    }),
    [odooENV, ready, currentMenuItem, setCurrentMenuItem]
  );

  return (
    <AppContext.Provider value={value}>
      <View {...props}>{props.children}</View>
    </AppContext.Provider>
  );
}

