export type OdooConfig = {
  ODOO_URL?: string;
  ODOO_DB?: string;
};

export type Menu = {
  id?: number;
  name?: string;
  action?: string;
  xmlid?: string;
  children?: any[];
  parent_id?: number[];
  sequense?: number;
  web_icon?: string;
  web_icon_data?: string;
};

export type User = {
  id?: number;
  name?: string;
  email?: string;
  image_256?: string;
  groups_id?: any[];
  menu?: Menu[];
  [key: string]: any;
};
