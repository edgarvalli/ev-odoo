import { useRef, useState } from "react";
import { Animated, BlurEvent, TextInput, View } from "react-native";
import Icon from "../Icon";
import { COLORS } from "./colos";
import { IControl } from "./type";

function Control({
  label,
  variant = "default",
  className,
  classNameInput,
  iconName,
  iconSize,
  iconType,
  value,
  ...props
}: IControl) {
  const [focused, setFocused] = useState(false)

  const animated = useRef(new Animated.Value(value ? 1 : 0)).current

  const animate = (to: number) => {
    Animated.timing(animated, {
      toValue: to,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const handleFocus = (e: any) => {
    setFocused(true)
    animate(1)
    props.onFocus?.(e)
  }

  const handleBlur = (e: BlurEvent) => {
    setFocused(false)
    if (!value) animate(0)
    props.onBlur?.(e)
  }

  const colors = COLORS[variant]

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -6],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    left: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [35, 10]
    }),
    color: focused ? colors.active : colors.label,
  }

  return (
    <View
      className={`border rounded-md p-4 ${className} flex-row items-center`}
      style={{
        borderColor: focused ? colors.active : colors.border,
      }}
    >
      {label && (
        <Animated.Text
          style={labelStyle}
          className="absolute left-3 bg-white px-1"
        >
          {label}
        </Animated.Text>
      )}

      <View className="flex-row items-center">
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize ?? 22}
            color={focused ? colors.active : "#9E9E9E"}
            className="me-2"
            type={iconType ?? "materialicons"}
          />
        )}

        <TextInput
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`flex-grow text-gray-800 p-2 pb-0  ${classNameInput}`}
        />
      </View>
    </View>
  )
}

export default Control
