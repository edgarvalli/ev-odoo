import { useAppContext } from "@/src/context/AppContext";
import { colors } from "@/src/theme/colors";
import { useEffect, useRef } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { menuItems } from "./menu.config";
import { MenuItem as MenuItemType, MenuProps } from "./types";

export function MenuItem(item: MenuItemType & { onPress?: (item: MenuItemType) => void; }) {

    const opacity = useRef(new Animated.Value(1)).current;
    const { setCurrentMenuOptionState } = useAppContext()

    useEffect(() => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start()
    }, [])

    return (
        <TouchableOpacity onPress={() => {
            setCurrentMenuOptionState?.(item);
            item.onPress?.(item)
        }}>
            <Animated.View className="flex-row gap-5 items-center pt-2 pb-2" style={{ opacity }}>
                <View className="p-2 rounded-sm" style={{ backgroundColor: colors.primary.bg }}>
                    <Icon type="materialicons" name={item.icon} size={18} color="primary" />
                </View>
                <Text className="text-gray-700">{item.displayName}</Text>
            </Animated.View>
        </TouchableOpacity>
    )

}

export function MenuItems(props: MenuProps) {

    return (
        <FlatList
            data={menuItems}
            keyExtractor={(item) => item.model}
            renderItem={({ item }) => <MenuItem {...item} onPress={props.onItemPress} />}
        />
    )

}