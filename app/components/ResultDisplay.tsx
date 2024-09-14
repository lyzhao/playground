import { Text, Box } from "@shopify/polaris";
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
          <Text as="h3" variant="headingMd">
            Product Created
          </Text>
          <DataBox title="Product Details" content={data.product} />
          <DataBox title="Variant Details" content={data.variant} />
        </>
      )}
      {data.type === "markets" && (
        <>
          <Text as="h3" variant="headingMd">
            Fetched Markets
          </Text>
          <DataBox title="Markets" content={data.markets} />
        </>
      )}
    </>
  );
}

function DataBox({ title, content }: { title: string; content: any }) {
  return (
    <>
      <Text as="h4" variant="headingMd">{title}</Text>
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