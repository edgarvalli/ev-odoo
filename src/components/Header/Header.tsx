import { useAppContext } from "@/src/context/AppContext";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import Menu from "../Menu";

export default function Header() {
    const [show, setShow] = useState(false);

    const { odooENV, ready, currentMenuOption } = useAppContext();

    useEffect(() => {
        odooENV.getUser(true)
    }, [ready])

    useEffect(() => {
        console.log("[This message is in Header component] current action " + currentMenuOption?.displayName)
        setShow(false)
    }, [currentMenuOption])

    if (!ready) return <View></View>

    return (
        <View>
            <View className="flex-row items-center gap-4  p-4">
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Avatar
                        source={{ uri: `data:image/png;base64,${odooENV.user?.image_256}` }}
                        className="h-[50px] w-[50px]"
                    />
                </TouchableOpacity>
                <Text className="font-bold text-xl w-full text-center pr-[120px]">{currentMenuOption?.displayName}</Text>
            </View>
            <Menu show={show} onClose={() => setShow(false)} />
        </View>
    );
}