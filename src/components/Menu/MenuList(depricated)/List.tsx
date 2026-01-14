import { useAppContext } from "@/src/context/AppContext";
import { OdooAction, OdooMenuItem } from "@/src/services/odoo";
import { useState } from "react";
import { FlatList } from "react-native";
import { MenuProps } from "../types";
import { ChildList } from "./ChildList";
import { MenuItem } from "./MenuItem";

export function MenuList(props: MenuProps) {
    const { odooENV, setCurrentAction } = useAppContext();
    const [children, setChildren] = useState<OdooMenuItem[] | null>(null);
    const [itemId, setItemId] = useState(0);

    const onPressCallback = (item: OdooMenuItem) => {
        props.onItemPress?.(item);
        setItemId(0)
    }

    const onItemPress = async (item: OdooMenuItem) => {
        // 1️⃣ Si tiene hijos → navegar
        if (item.children?.length) {
            setChildren(item.children);
            return;
        }

        // 2️⃣ Si no tiene acción → callback
        if (!item.action) {
            onPressCallback(item);
            return;
        }

        // 3️⃣ Parsear la acción
        // Ej: "ir.actions.act_window,312"
        const [model, id] = item.action.split(",");

        if (!model || !id) {
            console.warn("Invalid action:", item.action);
            return;
        }

        // 4️⃣ Leer la acción real
        const resp = await odooENV.read<OdooAction>(
            model,
            [Number(id)]
        );

        const action = resp.result?.[0];
        if (!action) {
            onPressCallback(item);
            return;
        }
        console.log(action)
        // 5️⃣ Guardar acción actual
        setCurrentAction?.(action);
    };


    if (children) return (
        <ChildList
            data={children}
            onItemPress={onItemPress}
            currentItemId={itemId}
            onBackPress={() => setChildren(null)} />
    )
    return (
        <FlatList className="mt-4"
            data={odooENV.user?.menu?.children ?? []}
            keyExtractor={(m, i) => String(m.id ?? i)}
            renderItem={({ item }) => <MenuItem menu={item} onItemPress={onItemPress} currentItemId={itemId} />}
        />
    )
}