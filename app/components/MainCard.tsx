import { Card, BlockStack, Text, InlineStack, Button, Box, Link } from "@shopify/polaris";

interface MainCardProps {
  isLoading: boolean;
  generateProduct: () => void;
  productData: any;
  productId: string | undefined;
}

export function MainCard({ isLoading, generateProduct, productData, productId }: MainCardProps) {
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
            Get started with products
          </Text>
          <Text as="p" variant="bodyMd">
            Generate a product with GraphQL and get the JSON output for that product. Learn more about the{" "}
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
          <Button loading={isLoading} onClick={generateProduct}>
            Generate a product
          </Button>
          {productData?.product && (
            <Button url={`shopify:admin/products/${productId}`} target="_blank" variant="plain">
              View product
            </Button>
          )}
        </InlineStack>
        {productData?.product && (
          <>
            <Text as="h3" variant="headingMd">
              {" "}
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
                <code>{JSON.stringify(productData.product, null, 2)}</code>
              </pre>
            </Box>
            <Text as="h3" variant="headingMd">
              {" "}
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
                <code>{JSON.stringify(productData.variant, null, 2)}</code>
              </pre>
            </Box>
          </>
        )}
      </BlockStack>
    </Card>
  );
}