import { FlatList, View } from "react-native";
import { Skeleton } from "./Skeleton";
import { IEVListProps } from "./types";

export function EVList<T>(props: IEVListProps<T>) {
    const { isLoading, ...flatProps } = props;
    const Separator = () => <View className="h-px bg-gray-200 dark:bg-gray-800 mx-4" />
    const paddingBottom = 16
    if (isLoading) return (
        <FlatList
            data={{ length: 10 }}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={{ paddingBottom }}
            renderItem={() => (
                <View className="p-4 border-b border-b-gray-200">
                    <View className="mb-4">
                        <Skeleton rounded="sm" />
                    </View>
                    <View>
                        <Skeleton rounded="sm" />
                    </View>
                </View>
            )}
        />
    )

    return <FlatList<T>
        {...flatProps}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingBottom }} />
}