import { OdooMenuItem } from "@/src/services/odoo";

export type MenuProps = {
  show?: boolean;
  onClose?: () => void;
  onItemPress?: (item: MenuItem) => void;
};

export interface IMenu {
  data: OdooMenuItem[];
  onItemPress?: (item: OdooMenuItem) => any;
  onBackPress?: () => void;
  level?: number;
  currentItemId?: number;
}

export interface MenuItemProps {
  menu: OdooMenuItem;
  currentItemId?: number;
  onItemPress?: (item: OdooMenuItem) => Promise<number | void>;
}

export type MenuItem = {
  model: string;
  icon: string;
  displayName: string;
  exclude?: boolean;
};
