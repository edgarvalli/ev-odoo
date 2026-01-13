import { useAppContext } from "@/src/context/AppContext";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import Menu from "../Menu";

export default function Header() {
    const [show, setShow] = useState(false);

    const { odooENV, ready } = useAppContext();

    useEffect(() => {
        odooENV.getUser(true)
    }, [ready])

    if (!ready) return <View></View>

    return (
        <View className="p-4">
            <TouchableOpacity onPress={() => setShow(true)}>
                <Avatar
                    source={{ uri: `data:image/png;base64,${odooENV.user.image_256}` }}
                    className="h-[50px] w-[50px]"
                />
            </TouchableOpacity>
            <Menu show={show} onClose={() => setShow(false)} user={odooENV.user} />
        </View>
    );
}