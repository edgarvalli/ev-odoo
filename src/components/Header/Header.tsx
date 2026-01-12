import { useUser } from "@/src/Hooks/useUser";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import Menu from "../Menu";

export default function Header() {
    const [show, setShow] = useState(false);

    const { user } = useUser();

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