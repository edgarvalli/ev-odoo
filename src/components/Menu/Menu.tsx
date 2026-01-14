import { Modal, View } from "react-native";
import MenuHeader from "./MenuHeader";
import { MenuItems } from "./MenuItems";
import MenuLayout from "./MenuLayout";
import { MenuProps } from "./types";

export function Menu(props: MenuProps) {
    return (
        <MenuLayout>
            <Modal visible={props.show} animationType="fade" transparent={true}>
                <View className="flex-1 flex justify-center items-center">
                    <View className="w-[80%] h-[80%] m-auto bg-white p-4 rounded-xl shadow-lg elevation-5">
                        <MenuHeader {...props} />
                        <View className="mt-4">
                            <MenuItems {...props} />
                        </View>
                    </View>
                </View>
            </Modal>
        </MenuLayout>
    );
}

export default Menu