import defaultImage from "@/src/assets/images/avatar.png";
import { Image, ImageProps } from "react-native";

export default function Avatar(props: ImageProps) {
  const { className, source, ...imageProps } = props;
  return (
    <Image
      {...imageProps}
      source={source ?? defaultImage}
      className={`
        rounded-full
        w-[40px] h-[40px]
        border border-gray-200
        ${className}`}
    />
  );
}
