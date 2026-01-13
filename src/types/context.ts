import { OdooClient } from "../services/odoo";
import { IMenuItem } from "./menuItem";

export type AppContex = {
  odooENV: OdooClient;
  ready?: boolean;
  menuItems?: IMenuItem[];
  currentMenuItem?: IMenuItem | null;
  setCurrentMenuItem?: (menuItem: IMenuItem) => void;
};
