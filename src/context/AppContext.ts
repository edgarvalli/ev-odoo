import { createContext, useContext } from "react";
import { AppContex } from "../types/context";

export const AppContext = createContext<AppContex | undefined>(undefined);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("The AppContext has been inside the component.");
  return ctx;
}
