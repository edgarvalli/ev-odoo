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
        textContentType="emailAddress"
        returnKeyType="next"
        value={username}
        variant="primary"
        onChangeText={(val) => setUsername(val)}
      />
      <Control
        className="mb-2"
        iconName="key"
        secureTextEntry
        autoCorrect={false}
        textContentType="password"
        label="Contraseña"
        enterKeyHint="send"
        returnKeyType="send"
        value={password}
        variant="primary"
        onChangeText={(val) => setPassword(val)}
      />
      <Button
        label="Iniciar sesión"
        className="w-[60%] mt-10 m-auto"
        color="primary"
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
