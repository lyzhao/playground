import { Card, BlockStack, InlineStack, Button, Banner } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { ResultDisplay } from "./ResultDisplay";
import { useCallback } from "react";

export function MainCard() {
  const { generateProduct, isLoading: isProductLoading, data: productData, error: productError, productId } = useProductActions();
  const { 
    fetchAllMarkets, 
    createRandomMarket, 
    isLoading: isMarketLoading,
    data: marketData,
    error: marketError
  } = useMarketActions();

  const handleGenerateProduct = useCallback(() => generateProduct(), [generateProduct]);
  const handleFetchAllMarkets = useCallback(() => fetchAllMarkets(), [fetchAllMarkets]);
  const handleCreateRandomMarket = useCallback(() => createRandomMarket(), [createRandomMarket]);

  const resultData = productData || marketData;
  const error = productError || marketError;

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
          {productId && (
            <Button url={`shopify:admin/products/${productId}`} target="_blank" variant="plain">
              View product
            </Button>
          )}
        </InlineStack>
        {error && <Banner tone="critical">{error}</Banner>}
        {resultData && <ResultDisplay data={resultData} />}
      </BlockStack>
    </Card>
  );
}