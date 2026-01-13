import { OdooClient } from "../services/odoo";

export type AppContex = {
  odooENV: OdooClient;
  ready?: boolean;
};
