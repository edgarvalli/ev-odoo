import { ReactNode } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

type KeyExtractor<T> = (item: T, index: number) => string;

interface SmartListProps<T> {
    data: T[];
    keyExtractor?: KeyExtractor<T>;

    // defaults
    titleKey?: keyof T;
    subtitleKey?: keyof T;

    // optional
    renderItem?: (item: T, index: number) => ReactNode;
    onItemPress?: (item: T) => void;

    emptyText?: string;
}

export function SmartList<T>({
    data,
    keyExtractor,
    titleKey = "name" as keyof T,
    subtitleKey,
    renderItem,
    onItemPress,
    emptyText = "Sin datos",
}: SmartListProps<T>) {
    return (
        <FlatList
            data={data}
            keyExtractor={
                keyExtractor ??
                ((item, index) => String((item as any).id ?? index))
            }
            ListEmptyComponent={
                <Text className="text-center text-gray-400 mt-10">
                    {emptyText}
                </Text>
            }
            renderItem={({ item, index }) => {
                if (renderItem) {
                    return <>{renderItem(item, index)}</>;
                }

                return (
                    <TouchableOpacity
                        onPress={() => onItemPress?.(item)}
                        className="
              px-4 py-3
              mx-2 mb-2
              rounded-xl
              bg-white dark:bg-gray-900
            "
                    >
                        <Text className="text-base text-gray-900 dark:text-gray-100 font-medium">
                            {String(item[titleKey])}
                        </Text>

                        {subtitleKey && (
                            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {String(item[subtitleKey])}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            }}
        />
    );
}
