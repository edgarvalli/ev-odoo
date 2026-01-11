import { Button, Control } from "@/src/components";
import { useState } from "react";
import { IEvents } from "./types";

interface LoginProps extends IEvents {
  onEditPress?: () => void;
}
export default function LoginView(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Control
        className="mb-10"
        iconName="mail"
        label="Usuario"
        keyboardType="email-address"
        enterKeyHint="next"
        placeholder="Escribe tu usuario o correo"
        placeholderTextColor={"#9b9b9b"}
        textContentType="emailAddress"
        returnKeyType="next"
        value={username}
        onChangeText={(val) => setUsername(val)}
      />
      <Control
        className="mb-2"
        iconName="key"
        secureTextEntry
        autoCorrect={false}
        textContentType="password"
        label="Contraseña"
        enterKeyHint="done"
        placeholder="Escribe contraseña"
        placeholderTextColor={"#9b9b9b"}
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <Button
        label="Iniciar sesión"
        className="w-[60%] mt-10 m-auto"
        color="success"
        onPress={() => props.onPress?.({ username, password })}
      />
      <Button
        label="Editar Odoo Config"
        className="w-[60%] mt-10 m-auto"
        color="warning"
        onPress={props.onEditPress}
      />
    </>
  );
}
