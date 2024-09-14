import { Card, BlockStack, InlineStack, Button } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { ActionData } from "../actions/indexActions";
import { useState, useCallback, useEffect } from "react";
import { ResultDisplay } from "./ResultDisplay";

export function MainCard() {
  const { generateProduct, isLoading: isProductLoading, productId, actionData: productData } = useProductActions();
  const { fetchAllMarkets, isLoading: isMarketLoading, actionData: marketData } = useMarketActions();
  const [resultData, setResultData] = useState<ActionData | undefined>(undefined);

  const handleGenerateProduct = useCallback(() => {
    generateProduct();
  }, [generateProduct]);

  const handleFetchAllMarkets = useCallback(() => {
    fetchAllMarkets();
  }, [fetchAllMarkets]);

  useEffect(() => {
    setResultData(productData);
  }, [productData]);

  useEffect(() => {
    setResultData(marketData);
  }, [marketData]);

  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack gap="300">
          <Button onClick={handleGenerateProduct} loading={isProductLoading}>
            Generate a product
          </Button>
          <Button onClick={handleFetchAllMarkets} loading={isMarketLoading}>
            Fetch all markets
          </Button>
          {resultData?.type === "product" && (
            <Button url={`shopify:admin/products/${productId}`} target="_blank" variant="plain">
              View product
            </Button>
          )}
        </InlineStack>
        <ResultDisplay data={resultData} />
      </BlockStack>
    </Card>
  );
}