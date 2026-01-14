import { Button } from "@/src/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Text, View } from "react-native";

export function Dashboard() {
    const logout = async () => {
        AsyncStorage.clear()
        router.replace("/")
    };
    return (
        <View className="flex-1 justify-center p-4 gap-5">
            <Text>Dashbord</Text>
            <Button label="Logout" onPress={logout} />
        </View>
    )
}