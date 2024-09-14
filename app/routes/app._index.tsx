import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Page, Layout, BlockStack } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { createProduct, updateProductVariant, ProductType, VariantType } from "../utils/productUtils";
import { fetchMarkets, MarketType } from "../utils/marketUtils";
import { MainCard } from "../components/MainCard";
import { AppSpecsCard } from "../components/AppSpecsCard";
import { NextStepsCard } from "../components/NextStepsCard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export type ActionData = 
  | { type: "product"; product: ProductType; variant: VariantType }
  | { type: "markets"; markets: MarketType[] }
  | { type: "error"; error: string };

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const action = formData.get("action");

  try {
    if (action === "generateProduct") {
      const product = await createProduct(admin);
      const variant = await updateProductVariant(admin, product);
      return json<ActionData>({ type: "product", product, variant });
    } else if (action === "fetchMarkets") {
      const markets = await fetchMarkets(admin);
      return json<ActionData>({ type: "markets", markets });
    }
    throw new Error("Invalid action");
  } catch (error) {
    return json<ActionData>({ type: "error", error: (error as Error).message }, { status: 400 });
  }
};

export default function Index() {
  const shopify = useAppBridge();

  return (
    <Page>
      <TitleBar title="Remix app template" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <MainCard />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <AppSpecsCard />
              <NextStepsCard />
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
