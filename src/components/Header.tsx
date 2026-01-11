import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import odooRPC from "../services/odoorpc";
import { Menu as MenuType, User } from "../types/user";
import Avatar from "./Avatar";
import Icon from "./Icon";

type MenuProps = {
  show?: boolean;
  onClose?: () => void;
  user?: User;
};

export function MenuItem({menu}: {menu: MenuType}) {
    return (
        <View className="p-3 flex flex-row justify-between">
            <Image className="w-[20px] h-[20px]" source={{uri: `data:image/png;base64,${menu.web_icon_data}`}}/>
            <Text>{menu.display_name}</Text>
        </View>
    )
}

export function Menu(props: MenuProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal visible={props.show} animationType="fade" transparent={true}>
          <View className="flex-1 flex justify-center items-center">
            <View className="w-[80%] h-[80%] m-auto bg-white p-4 rounded-xl shadow-lg elevation-5">
              <View className="flex flex-row justify-between">
                <Avatar
                  source={{
                    uri: `data:image/png;base64,${props.user?.image_256}`,
                  }}
                  className="h-[50px] w-[50px]"
                />
                <TouchableOpacity onPress={props.onClose}>
                  <Icon
                    type="materialicons"
                    name="close"
                    size={24}
                    color="#9b9b9b"
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-2">
                <Text className="font-bold text-gray-900">{props.user?.name}</Text>
                <Text className="text-[12px] text-gray-500">{props.user?.email}</Text>
              </View>
              <ScrollView className="mt-4">
                {
                    props.user?.menu?.map(m => <MenuItem menu={m} key={m.id}/>)
                }
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function Header() {
  const [user, setUser] = useState({} as User);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const odoo = await odooRPC().init();
      setUser(odoo.user);
    };
    getUser();
  }, []);

  return (
    <View className="p-4">
      <TouchableOpacity onPress={() => setShow(true)}>
        <Avatar
          source={{ uri: `data:image/png;base64,${user.image_256}` }}
          className="h-[50px] w-[50px]"
        />
      </TouchableOpacity>
      <Menu show={show} onClose={() => setShow(false)} user={user} />
    </View>
  );
}
