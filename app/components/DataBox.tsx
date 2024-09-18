import { BlockStack, Text, Box } from "@shopify/polaris";
import React from "react";

interface DataBoxProps<T> {
  title?: string;
  subtitle: string;
  content: T;
}

export const DataBox = function DataBox<T>({ title, subtitle, content }: DataBoxProps<T>) {
  return (
    <BlockStack gap="200" aria-label={title || subtitle}>
      {title && <Text as="h3" variant="headingMd">{title}</Text>}
      <Text as="h4" variant="headingMd">{subtitle}</Text>
      <Box
        padding="400"
        background="bg-surface-active"
        borderWidth="025"
        borderRadius="200"
        borderColor="border"
        overflowX="scroll"
        role="presentation"
        aria-live="polite"
      >
        <pre style={{ margin: 0 }}>
          <code>{JSON.stringify(content, null, 2)}</code>
        </pre>
      </Box>
    </BlockStack>
  );
};