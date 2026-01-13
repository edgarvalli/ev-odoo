export type CRUD = "read" | "write" | "create" | "unlink";

export type OdooArgs = {
  service: string;
  method: string;
  args: any[];
};

export type OdooError = {
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

export interface SearchReadParams {
  domain?: any[];
  fields?: string[];
  limit?: number;
  offset?: number;
  order?: string;
}

export type OdooConfig = {
  ODOO_URL?: string;
  ODOO_DB?: string;
};

export type Menu = {
  id?: number;
  name?: string;
  action?: string;
  xmlid?: string;
  children?: any[];
  parent_id?: number[];
  sequense?: number;
  web_icon?: string;
  web_icon_data?: string;
};

export type Model = {
  id?: number;
  name?: string;
  model?: string;
  state?: string;
};

export type User = {
  id?: number;
  name?: string;
  email?: string;
  image_256?: string;
  groups_id?: any[];
  menu?: Menu[];
  models?: Model[];
  [key: string]: any;
};

export interface OdooClient {
  /* ----------- SESSION ----------- */

  url?: string;
  db: string;
  uid: number;
  password: string;
  user: User;

  login(
    db: string,
    login: string,
    password: string
  ): Promise<OdooResponse<number>>;

  getCache: (key: string) => Promise<any>;
  init(): Promise<any>;
  restoreSession(): Promise<boolean>;

  logout(): Promise<void>;

  /* ----------- CORE RPC ----------- */

  execute<T>(
    model: string,
    method: string,
    args?: any[],
    kwargs?: Record<string, any>
  ): Promise<OdooResponse<T>>;

  /* ----------- USER ----------- */

  getUser(force?: boolean): Promise<User | null>;

  /* ----------- PERMISSIONS ----------- */

  can(model: string, perm: CRUD): Promise<boolean>;

  modelPermissions(model: string): Promise<Record<CRUD, boolean>>;

  /* ----------- METADATA ----------- */

  fields(model: string): Promise<
    Record<
      string,
      {
        string: string;
        type: string;
        required: boolean;
        relation?: string;
      }
    >
  >;

  /* ----------- DATA ----------- */

  searchRead<T>(
    model: string,
    params?: SearchReadParams
  ): Promise<OdooResponse<T[]>>;

  read<T>(
    model: string,
    ids: number[],
    fields?: string[]
  ): Promise<OdooResponse<T[]>>;

  create(
    model: string,
    values: Record<string, any>
  ): Promise<OdooResponse<number>>;

  write(
    model: string,
    ids: number[],
    values: Record<string, any>
  ): Promise<OdooResponse<boolean>>;

  unlink(model: string, ids: number[]): Promise<OdooResponse<boolean>>;
}
