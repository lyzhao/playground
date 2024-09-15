import { useCallback, useReducer, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../actions/indexActions";

type ProductState = {
  isLoading: boolean;
  error: string | null;
  data: Extract<ActionData, { type: "product" }> | null;
};

type ProductAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Extract<ActionData, { type: "product" }> }
  | { type: "FETCH_ERROR"; payload: string };

function productReducer(state: ProductState, action: ProductAction): ProductState {
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

export function useProductActions() {
  const fetcher = useFetcher<ActionData>();
  const [state, dispatch] = useReducer(productReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  const generateProduct = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    fetcher.submit({ action: "generateProduct" }, { method: "POST" });
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.type === "product") {
      dispatch({ type: "FETCH_SUCCESS", payload: fetcher.data });
    } else if (fetcher.data && fetcher.data.type === "error") {
      dispatch({ type: "FETCH_ERROR", payload: fetcher.data.error });
    }
  }, [fetcher.data]);

  const productId = state.data?.product.id.replace("gid://shopify/Product/", "");

  return {
    generateProduct,
    ...state,
    productId,
  };
}