import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface SkeletonProps {
    width?: number | string;
    height?: number;
    rounded?: "sm" | "md" | "lg" | "xl";
}

export function Skeleton({
    width = "100%",
    height = 16,
    rounded = "md",
}: SkeletonProps) {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const radius = {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
    }[rounded];

    return (
        <Animated.View
            style={{
                opacity,
                width: typeof width === "string" ? undefined : width,
                height
            }}
            className={`bg-gray-200 dark:bg-gray-700 ${radius} ${typeof width === "string" ? "w-full" : ""}`}
        />
    );
}
