import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { ColorKey, colors } from "../theme/colors";

export const iconTypes = {
  fontawesome: FontAwesome,
  fontawesome5: FontAwesome5,
  fontawesome6: FontAwesome6,
  materialicons: MaterialIcons,
} as const;

export type IconProps = {
  type: keyof typeof iconTypes;
  name: string;
  size?: number;
  color?: ColorKey;
  className?: string;
};
const Icon = (props: IconProps) => {
  const IconComponent = iconTypes[props.type];
  const color = props.color && colors[props.color];
  return (
    <IconComponent
      name={props.name}
      size={props.size}
      color={color?.text}
      className={props.className}
    />
  );
};

Icon.displayName = "Icon";
export default Icon;
