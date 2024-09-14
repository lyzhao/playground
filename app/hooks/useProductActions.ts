import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionData } from "../actions/indexActions";

export function useProductActions() {
  const fetcher = useFetcher<ActionData>();
  const [actionData, setActionData] = useState<ActionData | undefined>(undefined);

  const generateProduct = useCallback(() => {
    fetcher.submit({ action: "generateProduct" }, { method: "POST" });
  }, [fetcher]);

  useEffect(() => {
    setActionData(undefined);
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.type === "product") {
      setActionData(fetcher.data);
    }
  }, [fetcher.state, fetcher.data]);

  const isLoading = fetcher.state === "submitting" && fetcher.formData?.get("action") === "generateProduct";
  const productId = actionData?.type === "product" ? actionData.product.id.replace("gid://shopify/Product/", "") : undefined;

  return {
    generateProduct,
    isLoading,
    productId,
    actionData
  };
}