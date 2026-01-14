import { useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { IMenu } from "../types";

export function ChildListItem(props: IMenu) {
    const [loading, setLoading] = useState(false);
    const level = useRef(props.level ?? 0).current
    return (
        <>
            {props.data.map(item => (
                <View key={item.id} >
                    <TouchableOpacity
                        onPress={async () => {
                            setLoading(true);
                            await props.onItemPress?.(item)
                            setLoading(false)
                        }}
                        style={{ paddingLeft: level * 16 }}
                    >
                        <View className="p-3 flex-row flex-grow items-center justify-between">
                            <Text className={`ms-4 w-[80%] ${level === 0 && "font-bold"}`}>{item.name}</Text>
                            {props.currentItemId === item.id && <ActivityIndicator />}
                        </View>
                    </TouchableOpacity>

                    {item.children?.length ? (
                        <ChildListItem
                            data={item.children}
                            level={level + 1}
                            onItemPress={props.onItemPress}
                        />
                    ) : null}
                </View>
            ))}
        </>
    );
}