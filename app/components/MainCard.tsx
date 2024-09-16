import { Card, BlockStack, InlineStack, Button } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { ActionData } from "../actions/indexActions";
import { useState, useCallback, useEffect } from "react";
import { ResultDisplay } from "./ResultDisplay";

export function MainCard() {
  const { generateProduct, isLoading: isProductLoading, productId, data: productData } = useProductActions();
  const { fetchAllMarkets, createRandomMarket, isLoading: isMarketLoading, data: marketData } = useMarketActions();
  const [resultData, setResultData] = useState<ActionData | undefined>(undefined);

  const handleGenerateProduct = useCallback(() => {
    generateProduct();
  }, [generateProduct]);

  const handleFetchAllMarkets = useCallback(() => {
    fetchAllMarkets();
  }, [fetchAllMarkets]);

  const handleCreateRandomMarket = useCallback(() => {
    createRandomMarket();
  }, [createRandomMarket]);

  useEffect(() => {
    if (productData) {
      setResultData(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (marketData) {
      setResultData(marketData);
    }
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
          <Button onClick={handleCreateRandomMarket} loading={isMarketLoading}>
            Create random market
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