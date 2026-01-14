import { useAppContext } from "@/src/context/AppContext";
import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";

import { ViewKey, ViewRoutes } from "./app.config";
export function Router() {
    const fade = useRef(new Animated.Value(1)).current;
    const { currentMenuOption } = useAppContext()

    const Component = useMemo(() => {
        const view = (currentMenuOption?.model ?? "home") as ViewKey;
        return ViewRoutes[view] ?? ViewRoutes.home;
    }, [currentMenuOption]);

    useEffect(() => {
        fade.setValue(0);
        Animated.timing(fade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start()

    }, [Component])

    return (
        <Animated.View className="flex-1" style={{ opacity: fade }}>
            <Component />
        </Animated.View>
    )
}