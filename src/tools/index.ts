import { Platform, UIManager } from "react-native";

export function enableLayoutAnimationExperimental() {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
