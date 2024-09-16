import { Card, BlockStack, InlineStack, Button } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { useState, useCallback, useEffect } from "react";
import { DataBox } from "./DataBox";

export function MainCard() {
  const { generateProduct, isLoading: isProductLoading, productId, data: productData } = useProductActions();
  const { fetchAllMarkets, createRandomMarket, state: marketState } = useMarketActions();
  const [resultDisplay, setResultDisplay] = useState<React.ReactNode | null>(null);

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
      setResultDisplay(
        <>
          <DataBox title="Product Created" subtitle="Product Details" content={productData.product} />
          <DataBox subtitle="Variant Details" content={productData.variant} />
        </>
      );
    }
  }, [productData]);

  useEffect(() => {
    if (marketState && marketState.status === 'success') {
      if (marketState.type === 'markets') {
        setResultDisplay(
          <DataBox title="Fetched Markets" subtitle="Markets" content={marketState.data.markets} />
        );
      } else if (marketState.type === 'marketCreated') {
        setResultDisplay(
          <DataBox title="Market Created" subtitle="New Market" content={marketState.data.market} />
        );
      }
    }
  }, [marketState]);

  const isMarketLoading = marketState && marketState.status === 'loading';

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
        {resultDisplay}
      </BlockStack>
    </Card>
  );
}