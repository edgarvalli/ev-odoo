import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import Icon, { iconTypes } from "./Icon";

interface IControl extends TextInputProps {
  label?: string;
  iconType?: keyof typeof iconTypes;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  iconSize?: React.ComponentProps<typeof MaterialIcons>["size"];
  classNameInput?: string;
}
function Control({
  label,
  className,
  classNameInput,
  iconName,
  iconSize,
  iconType,
  ...props
}: IControl) {
  return (
    <View className={className}>
      {label && <Text className="text-gray-700 mb-2">{label}</Text>}

      <View className="relative">
        <TextInput
          {...props}
          className={`p-4 pl-10 rounded-lg bg-gray-200 text-gray-800 ${classNameInput}`}
          style={{backgroundColor: "#eee"}}
        />

        <Icon
          name={iconName ?? "home"}
          size={iconSize ?? 22}
          className="absolute left-3 top-3.5 inset-y-0 justify-center"
          color="#9E9E9E"
          type={iconType ?? "materialicons"}
        />
      </View>
    </View>
  );
}

export default Control;
