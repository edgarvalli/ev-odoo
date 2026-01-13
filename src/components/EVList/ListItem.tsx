import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { ListItemProps } from "./types";

export function ListItem({ children, onPress }: ListItemProps) {
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        opacity.setValue(0)
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false
        }).start()
    }, [children])

    const Container = onPress ? TouchableOpacity : View;
    return (
        <Animated.View style={{ opacity }}>
            <Container onPress={onPress} className="p-4 border-b border-b-gray-200">
                {children}
            </Container>
        </Animated.View>
    )
}