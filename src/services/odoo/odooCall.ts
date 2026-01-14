import { OdooArgs, OdooResponse } from "./types";

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

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from Odoo");
  }

  // 🛑 Odoo a veces devuelve "None"
  if (text.trim() === "None") {
    return {
      id: Date.now(),
      jsonrpc: "2.0",
      result: undefined,
    };
  }

  let data: OdooResponse<T>;

  try {
    data = JSON.parse(text) as OdooResponse<T>;
  } catch (err) {
    console.error("❌ Invalid JSON from Odoo:", text);
    return {
      id: Date.now(),
      error: {
        code: 0,
        message: text,
        data: null,
      },
      jsonrpc: "2.0",
      result: null as T,
    };
  }

  if (data.error) {
    throw data.error;
  }

  return data;
}

export default odooCall;
