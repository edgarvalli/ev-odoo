export type CRUD = "read" | "write" | "create" | "unlink";
export type OdooIDName = [number, string];

export type OdooUID = OdooIDName;

export type OdooDateTime = string;
export type OdooAction = OdooClientAction | OdooActWindowAction;

export type OdooViewMode =
  | "tree"
  | "form"
  | "kanban"
  | "calendar"
  | "pivot"
  | "graph"
  | "activity";

export interface OdooViewRef {
  0: number | false;
  1: OdooViewMode;
}

export type OdooSearchViewArch = string;

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

export type OdooRef = {
  model: string;
  id: number;
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

export type OdooMenuItem = {
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

/* ------------ MODELS ------------------ */
export type OdooMenu = {
  all_menu_ids?: number[];
  children?: OdooMenuItem[];
};

export type OdooModel = {
  id?: number;
  name?: string;
  model?: string;
  state?: string;
};

export type OdooUser = {
  id?: number;
  name?: string;
  email?: string;
  image_256?: string;
  groups_id?: any[];
  menu?: OdooMenu;
  models?: OdooModel[];
  [key: string]: any;
};

export type OdooIdName = [number, string];

export interface OdooActionBase {
  id: number;
  name: string;
  type: string;
  xml_id?: string;
  help?: string | false;
  context?: string | Record<string, any>;
  target?: "current" | "new";
  create_date?: string;
  write_date?: string;
  create_uid?: OdooIdName;
  write_uid?: OdooIdName;
  __last_update?: string;
  binding_type?: string;
  binding_view_types?: string;
  binding_model_id?: number | false;
  display_name?: string;
  xml_content?: string;
}

export interface OdooClientAction extends OdooActionBase {
  type: "ir.actions.client";
  tag: string;
  params?: Record<string, any>;
  params_store?: string;
  res_model?: string;
}

export interface OdooActWindowAction extends OdooActionBase {
  type: "ir.actions.act_window";

  res_model: string;
  view_mode: string;
  views?: any[];
  view_id?: OdooIdName | false;
  view_ids?: number[];
  search_view_id?: OdooIdName;
  search_view?: string;

  domain?: string | false;
  filter?: any | false;
  groups_id?: number[];
  limit?: number;
  usage?: string | false;
  res_id?: number;
}

export interface OdooActionActWindow {
  id: number;
  xml_id?: string;

  type: "ir.actions.act_window";
  name: string;
  display_name: string;

  res_model: string;
  res_id: number;

  target: "current" | "new" | "fullscreen";

  view_mode: string; // ej: "tree,kanban,form"
  view_id: number | false;
  view_ids: number[];

  views: OdooViewRef[];

  domain: string;
  context: string;

  limit: number;
  usage: boolean | string;

  search_view_id: OdooIDName;
  search_view: OdooSearchViewArch;

  binding_type: "action" | false;
  binding_model_id: number | false;
  binding_view_types: string;

  groups_id: number[];

  help?: string | false;
  filter: boolean;

  create_uid: OdooUID;
  create_date: OdooDateTime;
  write_uid: OdooUID;
  write_date: OdooDateTime;

  __last_update: OdooDateTime;
}

export interface OdooClient {
  /* ----------- SESSION ----------- */

  url?: string;
  db: string;
  uid: number;
  password: string;
  user?: OdooUser | null;

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

  getUser(force?: boolean): Promise<OdooUser | null>;

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

  ref(xmlId: string): Promise<OdooRef | null>;

  refRead<T = any>(xmlId: string, fields?: string[]): Promise<T | null>;

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
