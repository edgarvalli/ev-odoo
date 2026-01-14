import { MenuItem } from "../components/Menu";
import { OdooClient } from "../services/odoo";

export type AppContex = {
  odooENV: OdooClient;
  ready?: boolean;
  setCurrentMenuOptionState?: (action: MenuItem) => void;
  currentMenuOption?: MenuItem | null;
};
