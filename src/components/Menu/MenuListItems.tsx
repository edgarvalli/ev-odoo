import { useAppContext } from "@/src/context/AppContext";
import { menuItems } from "@/src/data/menu";
import { IMenuItem } from "@/src/types/menuItem";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import { IMenu, MenuProps } from "./types";

function MenuListItems(props: MenuProps) {
    const item: IMenuItem = {
        id: 0,
        name: "home",
        displayName: "Inicio",
        icon: "home",
        url: "/app",
        bypass: true
    }
    const menuOptions = [item, ...Object.values(menuItems)];
    return (
        <FlatList className="mt-4"
            data={menuOptions}
            keyExtractor={(m, i) => String(m.name ?? i)}
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
    const [allowed, setAllowed] = useState(false);
    const { odooENV, ready, setCurrentMenuItem } = useAppContext();

    useEffect(() => {
        if (menu.bypass) return;
        odooENV.can(menu.name ?? "res.users", "read").then(allow => {
            setAllowed(allow)
        })
    }, [ready])

    if (!allowed && !menu.bypass) return <></>;

    return (
        <AnimateItem>
            <TouchableOpacity onPress={() => {
                setCurrentMenuItem?.(menu);
                onItemPress?.(menu);
            }}>
                <View className="p-3 flex flex-row">
                    <Icon name={menu.icon ?? "home"} type="materialicons" size={18} />
                    <Text className="ms-4">{menu.displayName}</Text>
                </View>
            </TouchableOpacity>
        </AnimateItem>
    )
}

export default MenuListItems