import { Card, BlockStack, Text, InlineStack, Link } from "@shopify/polaris";

export function AppSpecsCard() {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingMd">
          App template specs
        </Text>
        <BlockStack gap="200">
          <InlineStack align="space-between">
            <Text as="span" variant="bodyMd">
              Framework
            </Text>
            <Link url="https://remix.run" target="_blank" removeUnderline>
              Remix
            </Link>
          </InlineStack>
          <InlineStack align="space-between">
            <Text as="span" variant="bodyMd">
              Database
            </Text>
            <Link url="https://www.prisma.io/" target="_blank" removeUnderline>
              Prisma
            </Link>
          </InlineStack>
          <InlineStack align="space-between">
            <Text as="span" variant="bodyMd">
              Interface
            </Text>
            <span>
              <Link url="https://polaris.shopify.com" target="_blank" removeUnderline>
                Polaris
              </Link>
              {", "}
              <Link url="https://shopify.dev/docs/apps/tools/app-bridge" target="_blank" removeUnderline>
                App Bridge
              </Link>
            </span>
          </InlineStack>
          <InlineStack align="space-between">
            <Text as="span" variant="bodyMd">
              API
            </Text>
            <Link url="https://shopify.dev/docs/api/admin-graphql" target="_blank" removeUnderline>
              GraphQL API
            </Link>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}