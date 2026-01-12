import { MaterialIcons } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { iconTypes } from "../Icon";

export type ControlVariant =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "warning";

export interface IControl extends TextInputProps {
  label?: string;
  variant?: ControlVariant;
  iconType?: keyof typeof iconTypes;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  iconSize?: React.ComponentProps<typeof MaterialIcons>["size"];
  classNameInput?: string;
}
