import { ReactNode, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Text, TouchableOpacity, View } from "react-native";
import { ImageB64 } from "../../ImageB64";
import { MenuItemProps } from "../types";

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

export function MenuItem({ menu, onItemPress, currentItemId }: MenuItemProps) {
    return (
        <AnimateItem>
            <TouchableOpacity onPress={async () => onItemPress?.(menu)}>
                <View className="p-3 flex-row flex-grow items-center">
                    <ImageB64 b64src={menu.web_icon_data} style={{ width: 30, height: 30 }} />
                    <Text className="ms-4 w-[80%]">{menu.name}</Text>
                    {currentItemId === menu.id && <ActivityIndicator />}
                </View>
            </TouchableOpacity>
        </AnimateItem>
    )
}