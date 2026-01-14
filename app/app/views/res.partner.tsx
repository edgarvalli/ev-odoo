import { Avatar } from "@/src/components";
import { EVList } from "@/src/components/EVList";
import { ListItem } from "@/src/components/EVList/ListItem";
import { useAppContext } from "@/src/context/AppContext";
import { useOdoo } from "@/src/hooks/useOdoo";
import { Text, View } from "react-native";

export default function Partners() {
    const { currentMenuOption } = useAppContext();
    const { response, loading } = useOdoo(currentMenuOption?.model)
    return (
        <View className="p-4">
            <EVList
                isLoading={loading}
                data={response?.result}
                renderItem={({ item }) => (
                    <ListItem onPress={() => undefined}>
                        <View className="flex-row items-center gap-3">
                            <Avatar
                                source={{ uri: `data:image/png;base64,${item.image_256}` }}
                                style={{ width: 60, height: 60 }} />
                            <View>
                                <Text className="text-gray-900 font-bold">{item.name}</Text>
                                <Text className="text-gray-400">{item.email}</Text>
                            </View>
                        </View>
                    </ListItem>
                )}
            />
        </View>
    )
}