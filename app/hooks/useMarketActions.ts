import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../routes/app._index";

export function useMarketActions() {
  const fetcher = useFetcher<ActionData>();

  const fetchAllMarkets = useCallback(() => 
    fetcher.submit({ action: "fetchMarkets" }, { method: "POST" }), [fetcher]);

  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";

  return {
    fetchAllMarkets,
    isLoading,
    actionData: fetcher.data,
  };
}