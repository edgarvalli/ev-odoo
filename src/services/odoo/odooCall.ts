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

  const data = (await res.json()) as OdooResponse<T>;
  if (data.error) throw data.error;
  return data;
}

export default odooCall;
