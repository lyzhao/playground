import { Card, BlockStack, Text, InlineStack, Button, Box, Link } from "@shopify/polaris";
import { useProductActions } from "../hooks/useProductActions";
import { useMarketActions } from "../hooks/useMarketActions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export function MainCard() {
  const { generateProduct, isLoading: isProductLoading, actionData: productData, productId } = useProductActions();
  const { fetchAllMarkets, isLoading: isMarketLoading, actionData: marketData } = useMarketActions();
  const shopify = useAppBridge();

  useEffect(() => {
    if (productData?.type === "product" && productId) {
      shopify.toast.show("Product created");
    }
    if (marketData?.type === "markets") {
      shopify.toast.show("Markets fetched");
    }
    if (productData?.type === "error" || marketData?.type === "error") {
      shopify.toast.show("An error occurred", { isError: true });
    }
  }, [productData, marketData, productId, shopify]);

  const actionData = productData || marketData;

  return (
    <Card>
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            Congrats on creating a new Shopify app 🎉
          </Text>
          <Text variant="bodyMd" as="p">
            This embedded app template uses{" "}
            <Link url="https://shopify.dev/docs/apps/tools/app-bridge" target="_blank" removeUnderline>
              App Bridge
            </Link>{" "}
            interface examples like an{" "}
            <Link url="/app/additional" removeUnderline>
              additional page in the app nav
            </Link>
            , as well as an{" "}
            <Link url="https://shopify.dev/docs/api/admin-graphql" target="_blank" removeUnderline>
              Admin GraphQL
            </Link>{" "}
            mutation demo, to provide a starting point for app development.
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">
            Get started with products and markets
          </Text>
          <Text as="p" variant="bodyMd">
            Generate a product with GraphQL or fetch all markets to get the JSON output. Learn more about the{" "}
            <Link
              url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
              target="_blank"
              removeUnderline
            >
              productCreate
            </Link>{" "}
            mutation in our API references.
          </Text>
        </BlockStack>
        <InlineStack gap="300">
          <Button onClick={generateProduct} loading={isProductLoading}>
            Generate a product
          </Button>
          <Button onClick={fetchAllMarkets} loading={isMarketLoading}>
            Fetch all markets
          </Button>
          {actionData?.type === "product" && (
            <Button url={`shopify:admin/products/${productId}`} target="_blank" variant="plain">
              View product
            </Button>
          )}
        </InlineStack>
        {actionData?.type === "product" && (
          <>
            <Text as="h3" variant="headingMd">
              productCreate mutation
            </Text>
            <Box
              padding="400"
              background="bg-surface-active"
              borderWidth="025"
              borderRadius="200"
              borderColor="border"
              overflowX="scroll"
            >
              <pre style={{ margin: 0 }}>
                <code>{JSON.stringify(actionData.product, null, 2)}</code>
              </pre>
            </Box>
            <Text as="h3" variant="headingMd">
              productVariantsBulkUpdate mutation
            </Text>
            <Box
              padding="400"
              background="bg-surface-active"
              borderWidth="025"
              borderRadius="200"
              borderColor="border"
              overflowX="scroll"
            >
              <pre style={{ margin: 0 }}>
                <code>{JSON.stringify(actionData.variant, null, 2)}</code>
              </pre>
            </Box>
          </>
        )}
        {actionData?.type === "markets" && (
          <>
            <Text as="h3" variant="headingMd">
              Fetched Markets
            </Text>
            <Box
              padding="400"
              background="bg-surface-active"
              borderWidth="025"
              borderRadius="200"
              borderColor="border"
              overflowX="scroll"
            >
              <pre style={{ margin: 0 }}>
                <code>{JSON.stringify(actionData.markets, null, 2)}</code>
              </pre>
            </Box>
          </>
        )}
      </BlockStack>
    </Card>
  );
}