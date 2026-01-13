import { ReactNode } from "react";
import { FlatListProps } from "react-native";
export interface IEVListProps<T> extends FlatListProps<T> {
  isLoading?: boolean;
}

export interface ListItemProps {
  children: ReactNode;
  onPress?: () => void;
}
