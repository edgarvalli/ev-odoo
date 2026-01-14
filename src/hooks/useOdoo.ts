import { useCallback, useEffect, useRef, useState } from "react";
import {
  createOdooClient,
  OdooClient,
  OdooResponse,
  SearchReadParams,
} from "../services/odoo";

export function useOdoo<T = any>(model?: string, execute = true) {
  const odooRef = useRef<OdooClient | null>(null);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<OdooResponse<T[]> | null>(null);
  const [error, setError] = useState<any>(null);

  if (!odooRef.current) {
    odooRef.current = createOdooClient();
  }

  const odooCall = useCallback(
    async (params: SearchReadParams = {}) => {
      if (!odooRef.current || !model) return;

      try {
        setLoading(true);
        setError(null);

        const resp = await odooRef.current.searchRead<T>(model, params);
        setResponse(resp ?? null);
        return resp;
      } catch (err) {
        setError(err);
        setResponse(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [model]
  );

  useEffect(() => {
    if (!execute) return;
    if (!model) return;
    odooRef.current?.init().then(() => odooCall({}));
  }, [model, execute, odooCall]);

  return {
    loading,
    response,
    error,
    odooCall,
    odooENV: odooRef.current,
  };
}
