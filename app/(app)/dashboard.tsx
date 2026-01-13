import { Button, Header } from "@/src/components";
import { AppProviderView } from "@/src/provider/AppProviderView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Dashboard() {
  const logout = async () => {
    AsyncStorage.clear()
    router.navigate("/")
  };
  return (
    <SafeAreaView>
      <Header />
      <Text>Dashbord</Text>
      <Button label="Logout" onPress={logout} />
    </SafeAreaView>
  );
}

export default function DashboardApp() {
  return (
    <AppProviderView>
      <Dashboard />
    </AppProviderView>
  )
}
