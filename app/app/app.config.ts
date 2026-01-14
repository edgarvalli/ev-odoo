import { Dashboard } from "./views/dashboard";
import Partners from "./views/res.partner";
import Users from "./views/res.users";

export type ViewKey = keyof typeof ViewRoutes;

export const ViewRoutes = {
  home: Dashboard,
  "res.users": Users,
  "res.partner": Partners,
} as const;
