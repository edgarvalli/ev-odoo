import { cache } from "./cache";
import odooCall from "./odooCall";
import { CRUD, SearchReadParams, User } from "./types";

export function createOdooClient(baseUrl?: string) {
  return {
    url: baseUrl ?? "",
    db: "",
    uid: 0,
    password: "",
    user: {} as User,

    /* ---------------- COMMON ---------------- */

    async init() {
      const session = await cache.get("odoo.session");
      if (session) return Object.assign(this, session);
      await cache.set("odoo.session", {
        url: this.url,
        db: this.db,
      });
    },

    async getCache(key: string) {
      const value = await cache.get(`odoo.${key}`);
      return value;
    },

    async login(db: string, login: string, password: string) {
      const resp = await odooCall<number>(this.url, {
        service: "common",
        method: "login",
        args: [db, login, password],
      });

      if (resp.result) {
        this.db = db;
        this.uid = resp.result;
        this.password = password;

        await cache.set("odoo.session", {
          url: this.url,
          db,
          uid: this.uid,
          password,
        });
      }

      this.user = (await this.getUser()) ?? {};

      await cache.set("odoo.user", this.user);

      return resp;
    },

    async restoreSession() {
      const session = await cache.get<any>("odoo.session");
      if (!session) return false;
      if (!session.uid) return false;
      return true;
    },

    /* ---------------- OBJECT ---------------- */

    async execute<T>(
      model: string,
      method: string,
      args: any[] = [],
      kwargs = {}
    ) {
      return odooCall<T>(this.url, {
        service: "object",
        method: "execute_kw",
        args: [this.db, this.uid, this.password, model, method, args, kwargs],
      });
    },

    /* ---------------- USER ---------------- */

    async getUser(force = false): Promise<User | null> {
      if (!force) {
        const cached = await cache.get<User>("odoo.user");
        if (cached) return cached;
      }

      if (!this.uid) return null;

      const resp = await this.execute<User[]>("res.users", "read", [
        [this.uid],
      ]);

      const user = resp.result?.[0] ?? null;
      if (!user) return user;

      const menus = await this.execute<any>("ir.ui.menu", "load_menus", [[]]);
      const access = await this.execute<any[]>(
        "ir.model.access",
        "search_read",
        [[["group_id", "in", user.groups_id]]],
        { fields: ["model_id"] }
      );

      if (access.result) {
        const modelIds = access.result.map((m) => {
          return m.model_id[0];
        });

        const models = await this.execute<any>(
          "ir.model",
          "search_read",
          [[["id", "in", modelIds]]],
          { fields: ["name", "model", "state"] }
        );

        Object.assign(user, models);
      }

      await cache.set("odoo.user", user);
      user.menu = menus.result.children;
      this.user = user;

      return user;
    },

    /* ---------------- PERMISSIONS ---------------- */

    async can(model: string, perm: CRUD): Promise<boolean> {
      const cacheKey = `perm:${model}:${perm}`;
      const cached = await cache.get<boolean>(cacheKey);
      if (cached !== null) return cached;

      const resp = await this.execute<boolean>(
        model,
        "check_access_rights",
        [perm],
        { raise_exception: false }
      );

      const allowed = !!resp.result;
      await cache.set(cacheKey, allowed);
      return allowed;
    },

    async modelPermissions(model: string) {
      const perms: Record<CRUD, boolean> = {
        read: false,
        write: false,
        create: false,
        unlink: false,
      };

      for (const p of Object.keys(perms) as CRUD[]) {
        perms[p] = await this.can(model, p);
      }

      return perms;
    },

    /* ---------------- METADATA ---------------- */

    async fields(model: string) {
      const key = `fields:${model}`;
      const cached = await cache.get<any>(key);
      if (cached) return cached;

      const resp = await this.execute<any>(model, "fields_get", [], {
        attributes: ["string", "type", "required", "relation"],
      });

      if (resp.result) await cache.set(key, resp.result);
      return resp.result;
    },

    /* ---------------- DATA ---------------- */

    async searchRead<T>(model: string, params: SearchReadParams = {}) {
      const { domain = [], ...kwargs } = params;
      return this.execute<T[]>(model, "search_read", [domain], kwargs);
    },

    async read<T>(model: string, ids: number[], fields?: string[]) {
      return this.execute<T[]>(model, "read", [ids], { fields });
    },

    async create(model: string, values: any) {
      return this.execute<number>(model, "create", [values]);
    },

    async write(model: string, ids: number[], values: any) {
      return this.execute<boolean>(model, "write", [ids, values]);
    },

    async unlink(model: string, ids: number[]) {
      return this.execute<boolean>(model, "unlink", [ids]);
    },

    /* ---------------- LOGOUT ---------------- */

    async logout() {
      this.uid = 0;
      this.password = "";
      await cache.remove("odoo.session");
      await cache.remove("odoo.user");
    },
  };
}
