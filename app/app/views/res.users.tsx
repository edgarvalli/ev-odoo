import { EVList } from "@/src/components/EVList";
import { ListItem } from "@/src/components/EVList/ListItem";
import { useAppContext } from "@/src/context/AppContext";
import { User } from "@/src/services/odoo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Users() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[] | null>(null);
    const { odooENV } = useAppContext();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const users = await odooENV.searchRead<User[]>("res.users", {});
            if (users.result) {
                setUsers(users.result ?? []);
            }
            setLoading(false);
        })()
    }, [])

    return (
        <View className="p-4">
            <EVList
                isLoading={loading}
                data={users}
                renderItem={({ item }) => (
                    <ListItem onPress={() => undefined}>
                        <View>
                            <Text className="text-gray-900 font-bold">{item.name}</Text>
                            <Text className="text-gray-400">{item.email}</Text>
                        </View>
                    </ListItem>
                )}
            />
        </View>
    )
}