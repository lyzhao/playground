import { BlockStack, Text, Box } from "@shopify/polaris";

interface DataBoxProps {
  title?: string;
  subtitle: string;
  content: any;
}

export function DataBox({ title, subtitle, content }: DataBoxProps) {
  return (
    <BlockStack gap="200">
      {title && <Text as="h3" variant="headingMd">{title}</Text>}
      <Text as="h4" variant="headingMd">{subtitle}</Text>
      <Box
        padding="400"
        background="bg-surface-active"
        borderWidth="025"
        borderRadius="200"
        borderColor="border"
        overflowX="scroll"
      >
        <pre style={{ margin: 0 }}>
          <code>{JSON.stringify(content, null, 2)}</code>
        </pre>
      </Box>
    </BlockStack>
  );
}