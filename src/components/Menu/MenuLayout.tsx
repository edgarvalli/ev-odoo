import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
function MenuLayout({ children }: any) {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MenuLayout