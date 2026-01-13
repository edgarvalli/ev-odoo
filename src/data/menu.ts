import { IMenuItem } from "../types/menuItem";

export const menuItems: Record<string, IMenuItem> = {
  "res.users": {
    id: 0,
    url: "/app",
    icon: "person",
    name: "res.users",
    displayName: "Usuarios",
  },
  "res.partner": {
    id: 0,
    url: "/app",
    icon: "group",
    name: "res.partner",
    displayName: "Contactos",
  },
} as const;
