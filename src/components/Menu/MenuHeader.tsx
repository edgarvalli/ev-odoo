import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import Icon from "../Icon";
import { MenuProps } from "./types";

function MenuHeader(props: MenuProps) {
    return (
        <>
            <View className="flex flex-row justify-between">
                <Avatar
                    source={{
                        uri: `data:image/png;base64,${props.user?.image_256}`,
                    }}
                    className="h-[50px] w-[50px]"
                />
                <TouchableOpacity onPress={props.onClose}>
                    <Icon
                        type="materialicons"
                        name="close"
                        size={24}
                        color="#9b9b9b"
                    />
                </TouchableOpacity>
            </View>
            <View className="mt-2">
                <Text className="font-bold text-gray-900">{props.user?.name}</Text>
                <Text className="text-[12px] text-gray-500">{props.user?.email}</Text>
            </View>
        </>
    )
}

export default MenuHeader