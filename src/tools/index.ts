import { XMLParser } from "fast-xml-parser";
import { Platform, UIManager } from "react-native";

export function enableLayoutAnimationExperimental() {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function parseXmlToJson(xml: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  if (xml) {
    return parser.parse(xml);
  }
}
