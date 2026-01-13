import { EVList } from "@/src/components/EVList";
import { ListItem } from "@/src/components/EVList/ListItem";
import { useAppContext } from "@/src/context/AppContext";
import { User } from "@/src/services/odoo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Partners() {
    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState<User[] | null>(null);
    const { odooENV } = useAppContext();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const partners = await odooENV.searchRead<User[]>("res.partner", {});
            if (partners.result) {
                setPartners(partners.result ?? []);
            }
            setLoading(false);
        })()
    }, [])

    return (
        <View className="p-4">
            <View className="mb-10">
                <EVList
                    isLoading={loading}
                    data={partners}
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
        </View>
    )
}