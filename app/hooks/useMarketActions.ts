import { useCallback, useReducer, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../actions/indexActions";

type MarketState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; type: 'markets'; data: Extract<ActionData, { type: "markets" }> }
  | { status: 'success'; type: 'marketCreated'; data: Extract<ActionData, { type: "marketCreated" }> };

type MarketAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Extract<ActionData, { type: "markets" | "marketCreated" }> }
  | { type: "FETCH_ERROR"; payload: string };

function marketReducer(state: MarketState, action: MarketAction): MarketState {
  switch (action.type) {
    case "FETCH_START":
      return { status: 'loading' };
    case "FETCH_SUCCESS":
      if (action.payload.type === "markets") {
        return { status: 'success', type: 'markets', data: action.payload };
      } else if (action.payload.type === "marketCreated") {
        return { status: 'success', type: 'marketCreated', data: action.payload };
      }
      return state; // Default case if the type is neither "markets" nor "marketCreated"
    case "FETCH_ERROR":
      return { status: 'error', error: action.payload };
    default:
      return state;
  }
}

export function useMarketActions() {
  const fetcher = useFetcher<ActionData>();
  const [state, dispatch] = useReducer(marketReducer, { status: 'idle' });

  const fetchAllMarkets = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    fetcher.submit({ action: "fetchMarkets" }, { method: "POST" });
  }, [fetcher]);

  const createRandomMarket = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    fetcher.submit({ action: "createRandomMarket" }, { method: "POST" });
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.type === "markets" || fetcher.data.type === "marketCreated") {
        dispatch({ type: "FETCH_SUCCESS", payload: fetcher.data });
      } else if (fetcher.data.type === "error") {
        dispatch({ type: "FETCH_ERROR", payload: fetcher.data.error });
      }
    }
  }, [fetcher.data]);

  return {
    fetchAllMarkets,
    createRandomMarket,
    state,
  };
}