import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, User } from "../types/user";

export type OdooArgs = {
  service: string;
  method: string;
  args: any[];
};

type OdooError = {
  code: number;
  message: string;
  data?: any;
};

export type OdooResponse<T> = {
  id: number;
  jsonrpc: string;
  result?: T;
  error?: OdooError;
};

export type SearchReadProps = {
  domain?: any[];
  fields?: string[];
  limit?: number;
  offset?: number;
  order?: string;
  context?: Record<string, any>;
};

async function odooCall<T>(
  url: string,
  params: OdooArgs
): Promise<OdooResponse<T>> {
  const res = await fetch(`${url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "call",
      params,
    }),
  });

  const data = (await res.json()) as OdooResponse<T>;
  if (data.error) throw data.error;
  return data;
}

export default function odooRPC(url?: string) {
  return {
    uid: 0,
    password: "",
    dbname: "",
    url: url ?? "http://localhost:8069",
    user: {} as User,
    async init() {
      const url = await AsyncStorage.getItem("ODOO_URL");
      const dbname = await AsyncStorage.getItem("ODOO_DB");
      const uid = await AsyncStorage.getItem("ODOO_UID");
      const password = await AsyncStorage.getItem("ODOO_PASS");
      this.uid = Number(uid) ?? 0;
      this.password = password ?? "";
      this.dbname = dbname ?? "";
      this.url = url ?? this.url;
      this.user = (await this.session() ?? {}) as User;
      return this;
    },
    async common<T>(method: string, args: string[]) {
      return odooCall<T>(this.url, {
        service: "common",
        method,
        args: [this.dbname, ...args],
      });
    },
    async executeKW<T>(args: any[]) {
      const params = {
        service: "object",
        method: "execute_kw",
        args: [this.dbname, Number(this.uid), this.password, ...args],
      };
      return odooCall<T>(this.url, params);
    },
    async session() {
      if(!this.uid)  return null;
      const user = await this.read<User[]>("res.users", {
        context: [this.uid],
        fields: ["name", "email", "image_256", "groups_id"]
      })

      if(!user.result) return null;
      const _user = user.result[0];
      const menu = await this.searchRead<Menu>("ir.ui.menu", {});
      _user.menu = menu.result ?? [] as Menu[]
      return _user
    },
    async login<T>(username: string, password: string) {
      const resp = await this.common<T>("login", [username, password]);
      if (resp.result) {
        this.uid = resp.result as number;
      }
      return resp;
    },
    read<T>(model: string, params: SearchReadProps) {
      const { context, ...args } = params;
      return this.executeKW<T>([model, "read", [context], args]);
    },
    searchRead<T>(model: string, params: SearchReadProps) {
      const { context, ...args } = params;
      return this.executeKW<T[]>([model, "search_read", [context], args]);
    },
  };
}
