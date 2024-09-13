import { Card, BlockStack, Text, List, Link } from "@shopify/polaris";

export function NextStepsCard() {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingMd">
          Next steps
        </Text>
        <List>
          <List.Item>
            Build an{" "}
            <Link url="https://shopify.dev/docs/apps/getting-started/build-app-example" target="_blank" removeUnderline>
              {" "}
              example app
            </Link>{" "}
            to get started
          </List.Item>
          <List.Item>
            Explore Shopify's API with{" "}
            <Link url="https://shopify.dev/docs/apps/tools/graphiql-admin-api" target="_blank" removeUnderline>
              GraphiQL
            </Link>
          </List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}