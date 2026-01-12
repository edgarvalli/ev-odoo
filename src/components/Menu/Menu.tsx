import { Modal, View } from "react-native";
import MenuHeader from "./MenuHeader";
import MenuLayout from "./MenuLayout";
import MenuListItems from "./MenuListItems";
import { MenuProps } from "./types";

export function Menu(props: MenuProps) {
    return (
        <MenuLayout>
            <Modal visible={props.show} animationType="fade" transparent={true}>
                <View className="flex-1 flex justify-center items-center">
                    <View className="w-[80%] h-[80%] m-auto bg-white p-4 rounded-xl shadow-lg elevation-5">
                        <MenuHeader {...props} />
                        <MenuListItems {...props} />
                    </View>
                </View>
            </Modal>
        </MenuLayout>
    );
}

export default Menu