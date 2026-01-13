import AsyncStorage from "@react-native-async-storage/async-storage";

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },

  async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
