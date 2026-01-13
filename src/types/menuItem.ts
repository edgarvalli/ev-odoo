import { Href } from "expo-router";

export interface IMenuItem {
  id?: number;
  name: string;
  url: Href;
  displayName: string;
  icon?: string;
  bypass?: boolean;
}
