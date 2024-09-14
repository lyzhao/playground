import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../actions/indexActions";

export function useMarketActions() {
  const fetcher = useFetcher<ActionData>();
  const [actionData, setActionData] = useState<ActionData | undefined>(undefined);

  const fetchAllMarkets = useCallback(() => {
    fetcher.submit({ action: "fetchMarkets" }, { method: "POST" });
  }, [fetcher]);

  useEffect(() => {
    setActionData(undefined);
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.type === "markets") {
      setActionData(fetcher.data);
    }
  }, [fetcher.state, fetcher.data]);

  const isLoading = fetcher.state === "submitting" && fetcher.formData?.get("action") === "fetchMarkets";

  return {
    fetchAllMarkets,
    isLoading,
    actionData
  };
}