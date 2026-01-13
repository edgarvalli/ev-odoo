import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProviderView } from "../provider/AppProviderView";
import Header from "./Header";

export default function ThemeProvider({ children, headerShow = true }: { children: ReactNode, headerShow?: boolean }) {
    return (
        <AppProviderView>
            <SafeAreaView>
                {
                    headerShow && <Header />
                }
                {children}
            </SafeAreaView>
        </AppProviderView>
    )
}