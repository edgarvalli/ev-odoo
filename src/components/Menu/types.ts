import { Menu } from "@/src/services/odoo";
import { IMenuItem } from "@/src/types/menuItem";
export type MenuProps = {
  show?: boolean;
  onClose?: () => void;
  onItemPress?: (m: Menu) => void;
};

export interface IMenu {
  menu: IMenuItem;
  onItemPress?: (m: IMenuItem) => void;
}
