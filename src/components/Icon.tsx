import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";

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
  color?: string;
  className?: string;
};
const Icon = (props: IconProps) => {
  const IconComponent = iconTypes[props.type];
  return (
    <IconComponent
      name={props.name}
      size={props.size}
      color={props.color}
      className={props.className}
    />
  );
};

Icon.displayName = "Icon";
export default Icon;
