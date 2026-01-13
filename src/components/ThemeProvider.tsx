import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProviderView } from "../provider/AppProviderView";
import Header from "./Header";

export default function ThemeProvider({ children, headerShow = true }: { children: ReactNode, headerShow?: boolean }) {
    return (
        <AppProviderView className="flex-1">
            <SafeAreaView className="flex-1">
                {
                    headerShow && <Header />
                }
                {children}
            </SafeAreaView>
        </AppProviderView>
    )
}