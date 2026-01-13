import { useAppContext } from "@/src/context/AppContext";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import Icon from "../Icon";
import { MenuProps } from "./types";

function MenuHeader(props: MenuProps) {
    const { odooENV } = useAppContext()
    return (
        <>
            <View className="flex flex-row justify-between">
                <Avatar
                    source={{
                        uri: `data:image/png;base64,${odooENV.user?.image_256}`,
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
                <Text className="font-bold text-gray-900">{odooENV.user?.name}</Text>
                <Text className="text-[12px] text-gray-500">{odooENV.user?.email}</Text>
            </View>
        </>
    )
}

export default MenuHeader