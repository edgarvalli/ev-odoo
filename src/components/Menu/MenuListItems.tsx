import Logo from "@/src/assets/images/logo.png";
import { ReactNode, useEffect, useRef } from "react";
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { IMenu, MenuProps } from "./types";

function MenuListItems(props: MenuProps) {
    let menuOptions = props.user?.menu ?? [];
    return (
        <FlatList className="mt-4"
            data={menuOptions}
            keyExtractor={(m, i) => String(m.id ?? i)}
            renderItem={({ item }) => <MenuItem menu={item} onItemPress={() => props.onItemPress?.(item)} />}
        />
    )
}

export function AnimateItem({ children, index }: { children?: ReactNode, index?: number }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(10)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                delay: (index ?? 1) * 40,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                delay: (index ?? 0) * 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ translateY }],
            }}
        >
            {children}
        </Animated.View>
    );
};

export function MenuItem({ menu, onItemPress }: IMenu) {
    const source = menu.web_icon_data
        ? { uri: `data:image/png;base64,${menu.web_icon_data}` }
        : Logo
    return (
        <AnimateItem>
            <TouchableOpacity onPress={() => onItemPress?.(menu)}>
                <View className="p-3 flex flex-row">
                    <Image className="w-[20px] h-[20px]" source={source} />
                    <Text className="ms-4">{menu.name}</Text>
                </View>
            </TouchableOpacity>
        </AnimateItem>
    )
}

export default MenuListItems