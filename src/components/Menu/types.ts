import { Menu, User } from "@/src/types/odoo";
export type MenuProps = {
  show?: boolean;
  onClose?: () => void;
  user?: User;
  onItemPress?: (m: Menu) => void;
};

export interface IMenu {
  menu: Menu;
  onItemPress?: (m: Menu) => void;
}
