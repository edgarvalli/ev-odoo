import DefaultIcon from "@/assets/images/icon.png";
import { Image, ImageProps } from "react-native";

export interface ImageB64Props extends ImageProps {
    b64src?: string;
}
export function ImageB64({ b64src, ...props }: ImageB64Props) {
    if (!b64src || b64src === "") return <Image {...props} source={DefaultIcon} />
    return <Image {...props} source={{ uri: `data:image/png;base64,${b64src}` }} />
}