import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Page, Layout, BlockStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { MainCard } from "../components/MainCard";
import { AppSpecsCard } from "../components/AppSpecsCard";
import { NextStepsCard } from "../components/NextStepsCard";
import { action, ActionData } from "../actions/indexActions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({});
};

export { action };
export type { ActionData };

export default function Index() {
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
