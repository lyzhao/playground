import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../routes/app._index";

export function useProductActions() {
  const fetcher = useFetcher<ActionData>();

  const generateProduct = useCallback(() => 
    fetcher.submit({ action: "generateProduct" }, { method: "POST" }), [fetcher]);

  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";
  const productId = fetcher.data?.type === "product" ? fetcher.data.product.id.replace("gid://shopify/Product/", "") : undefined;

  return {
    generateProduct,
    isLoading,
    actionData: fetcher.data,
    productId
  };
}