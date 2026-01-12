import { useEffect, useState } from "react";
import odooRPC from "../services/odoorpc";
import { User } from "../types/odoo";

export function useUser() {
  const [user, setUser] = useState({} as User);
  const getUser = async () => {
    const odoo = await odooRPC().init();
    setUser(odoo.user);
  };
  useEffect(() => {
    getUser();
  }, []);

  return { user, setUser, getUser };
}
