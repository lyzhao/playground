import { useCallback, useReducer, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../actions/indexActions";

type MarketState = {
  isLoading: boolean;
  error: string | null;
  data: Extract<ActionData, { type: "markets" | "marketCreated" }> | null;
};

type MarketAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Extract<ActionData, { type: "markets" | "marketCreated" }> }
  | { type: "FETCH_ERROR"; payload: string };

function marketReducer(state: MarketState, action: MarketAction): MarketState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

export function useMarketActions() {
  const fetcher = useFetcher<ActionData>();
  const [state, dispatch] = useReducer(marketReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  const fetchAllMarkets = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    fetcher.submit({ action: "fetchMarkets" }, { method: "POST" });
  }, [fetcher]);

  const createRandomMarket = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    fetcher.submit({ action: "createRandomMarket" }, { method: "POST" });
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.data && (fetcher.data.type === "markets" || fetcher.data.type === "marketCreated")) {
      dispatch({ type: "FETCH_SUCCESS", payload: fetcher.data });
    } else if (fetcher.data && fetcher.data.type === "error") {
      dispatch({ type: "FETCH_ERROR", payload: fetcher.data.error });
    }
  }, [fetcher.data]);

  return {
    fetchAllMarkets,
    createRandomMarket,
    ...state,
  };
}