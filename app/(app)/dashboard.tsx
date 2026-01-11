import { Button, Header } from "@/src/components";
import odooRPC from "@/src/services/odoorpc";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const logout = async () => {
    const odoo = await odooRPC().init();
    const result = await odoo.read("res.users", {
      context: [["id", "=", odoo.uid]],
      fields: ["name", "email", "image_256", "groups_id"],
    });

    console.log(result.result);
  };
  return (
    <SafeAreaView>
      <Header />
      <Text>Dashbord</Text>
      <Button label="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
