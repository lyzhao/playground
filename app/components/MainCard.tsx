/* Start of Selection */
import { Card, BlockStack, InlineStack, Button, Banner, Text } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { useState, useCallback, useEffect } from "react";
import { DataBox } from "./DataBox";
import type { ProductType, VariantType } from "../utils/productUtils";
import type { MarketType } from "../utils/marketUtils";

export function MainCard() {
  const {
    generateProduct,
    isLoading: isProductLoading,
    productId,
    data: productData,
    error: productError,
  } = useProductActions();

  const {
    fetchAllMarkets,
    createRandomMarket,
    state: marketState,
  } = useMarketActions();

  // State to hold an array of DataBox components
  const [resultDisplays, setResultDisplays] = useState<React.ReactNode[]>([]);

  // Handlers for button clicks
  const handleGenerateProduct = useCallback(() => {
    generateProduct();
    // Optionally, clear previous results
    setResultDisplays([]);
  }, [generateProduct]);

  const handleFetchAllMarkets = useCallback(() => {
    fetchAllMarkets();
    setResultDisplays([]);
  }, [fetchAllMarkets]);

  const handleCreateRandomMarket = useCallback(() => {
    createRandomMarket();
    setResultDisplays([]);
  }, [createRandomMarket]);

  // Effect to handle product data updates
  useEffect(() => {
    if (productData) {
      setResultDisplays((prev) => [
        ...prev,
        <DataBox<ProductType>
          key={`product-${productData.product.id}`}
          title="Product Created"
          subtitle="Product Details"
          content={productData.product}
        />,
        <DataBox<VariantType>
          key={`variant-${productData.product.id}-variant`}
          subtitle="Variant Details"
          content={productData.variant}
        />,
      ]);
    }
  }, [productData]);

  // Effect to handle market data updates
  useEffect(() => {
    if (marketState && marketState.status === "success") {
      if (marketState.type === "markets") {
        // Append a DataBox for each market
        marketState.data.markets.forEach((market) => {
          setResultDisplays((prev) => [
            ...prev,
            <DataBox<MarketType>
              key={`markets-${market.id}`}
              title="Fetched Markets"
              subtitle="Markets"
              content={market}
            />,
          ]);
        });
      } else if (marketState.type === "marketCreated") {
        setResultDisplays((prev) => [
          ...prev,
          <DataBox<MarketType>
            key={`marketCreated-${marketState.data.market.id}`}
            title="Market Created"
            subtitle="New Market"
            content={marketState.data.market}
          />,
        ]);
      }
    }
  }, [marketState]);

  // Determine if any action is loading
  const isMarketLoading = marketState && marketState.status === "loading";
  const isAnyLoading = isProductLoading || isMarketLoading;

  // Combine errors
  const marketError = marketState && marketState.status === "error" ? marketState.error : undefined;
  const combinedError = productError || marketError;

  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack gap="300">
          <Button
            onClick={handleGenerateProduct}
            loading={isProductLoading}
            disabled={isAnyLoading}
          >
            Generate a product
          </Button>
          <Button
            onClick={handleFetchAllMarkets}
            loading={isMarketLoading}
            disabled={isAnyLoading}
          >
            Fetch all markets
          </Button>
          <Button
            onClick={handleCreateRandomMarket}
            loading={isMarketLoading}
            disabled={isAnyLoading}
          >
            Create random market
          </Button>
          {productId && (
            <Button
              url={`shopify:admin/products/${productId}`}
              target="_blank"
              variant="plain"
            >
              View product
            </Button>
          )}
        </InlineStack>

        {/* Display separate error messages */}
        {productError && (
          <Banner tone="critical">Product Error: {productError}</Banner>
        )}
        {marketError && (
          <Banner tone="critical">Market Error: {marketError}</Banner>
        )}

        {/* Display DataBoxes or a message when no results are available */}
        <BlockStack gap="400">
          {resultDisplays.length > 0 ? (
                resultDisplays
              ) : (
                <Text as="p" variant="bodyMd" alignment="center">
                  No results to display. Please perform an action.
                </Text>
              )}
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
