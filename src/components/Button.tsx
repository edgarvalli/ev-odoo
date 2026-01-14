import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { colors } from "../theme/colors";
import Icon, { iconTypes } from "./Icon";
export interface IButton extends TouchableOpacityProps {
  label?: string;
  color?: keyof typeof colors;
  className?: string;
  icon?: keyof typeof iconTypes;
  iconName?: string;
}


export default function Button({
  label,
  color = "primary",
  className,
  icon,
  iconName,
  style,
  ...props
}: IButton) {
  const c = colors[color];
  return (
    <TouchableOpacity
      className={`py-4 px-6 rounded-md flex flex-row justify-center items-center ${className}`}
      style={[style, { backgroundColor: c.bg }]}
      {...props}
    >
      {icon && (
        <Icon name={iconName ?? "home"} size={14} color={color} type={icon} />
      )}
      <Text className={`${c.text} ${icon && "ms-2"}`}>{label}</Text>
    </TouchableOpacity>
  );
}
