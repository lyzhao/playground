import { Box, Text } from "@shopify/polaris";
import { ActionData } from "../actions/indexActions";

interface ResultDisplayProps {
  data: ActionData | undefined;
}

export function ResultDisplay({ data }: ResultDisplayProps) {
  if (!data) return null;

  return (
    <>
      {data.type === "product" && (
        <>
          <DataBox title="Product Created" subtitle="Product Details" content={data.product} />
          <DataBox subtitle="Variant Details" content={data.variant} />
        </>
      )}
      {data.type === "markets" && (
        <DataBox title="Fetched Markets" subtitle="Markets" content={data.markets} />
      )}
      {data.type === "marketCreated" && (
        <DataBox title="Market Created" subtitle="New Market" content={data.market} />
      )}
    </>
  );
}

function DataBox({ title, subtitle, content }: { title?: string; subtitle: string; content: any }) {
  return (
    <>
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
    </>
  );
}