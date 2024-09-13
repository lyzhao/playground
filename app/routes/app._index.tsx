import { useEffect, useCallback } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Page, Layout, Button, BlockStack } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { createProduct, updateProductVariant } from "../utils/productUtils";
import { MainCard } from "../components/MainCard";
import { AppSpecsCard } from "../components/AppSpecsCard";
import { NextStepsCard } from "../components/NextStepsCard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  const product = await createProduct(admin);
  const variant = await updateProductVariant(admin, product);

  return json({ product, variant });
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();
  
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace("gid://shopify/Product/", "");

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);

  const generateProduct = useCallback(() => fetcher.submit({}, { method: "POST" }), [fetcher]);

  return (
    <Page>
      <TitleBar title="Remix app template" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <MainCard
              isLoading={isLoading}
              generateProduct={generateProduct}
              productData={fetcher.data}
              productId={productId}
            />
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
