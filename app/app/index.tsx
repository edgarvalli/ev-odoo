import { Button } from "@/src/components";
import ThemeProvider from "@/src/components/ThemeProvider";
import { useAppContext } from "@/src/context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Text, View } from "react-native";
import Partners from "./views/res.partner";
import Users from "./views/res.users";

type ViewKey = keyof typeof Views;
const Views = {
  "home": Dashboard,
  "res.users": Users,
  "res.partner": Partners
} as const;

function Dashboard() {
  const logout = async () => {
    AsyncStorage.clear()
    router.replace("/")
  };
  return (
    <View className="flex-1">
      <Text>Dashbord</Text>
      <Button label="Logout" onPress={logout} />
    </View>
  )
}

function Router() {
  const fade = useRef(new Animated.Value(1)).current;
  const { currentMenuItem } = useAppContext()

  const Component = useMemo(() => {
    const view = (currentMenuItem?.name ?? "home") as ViewKey;
    return Views[view] ?? Views.home;
  }, [currentMenuItem]);

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start()

  }, [Component])

  return (
    <Animated.View className="flex-1" style={{ opacity: fade }}>
      <Component />
    </Animated.View>
  )
}

export default () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
