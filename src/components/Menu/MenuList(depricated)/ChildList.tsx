import { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IMenu } from "../types";
import { ChildListItem } from "./ChildListItem";

export function ChildList(props: IMenu) {

    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        opacity.setValue(0)

        Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start()
    }, [])

    return (
        <Animated.View style={{ opacity }}>
            <View>
                <TouchableOpacity onPress={props.onBackPress}>
                    <Text className="text-blue-700 pt-4 pb-4">Back</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <ChildListItem {...props} />
            </ScrollView>
        </Animated.View>
    )
}