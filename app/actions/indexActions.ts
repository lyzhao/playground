import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { createProduct, updateProductVariant, ProductType, VariantType } from "../utils/productUtils";
import { fetchMarkets, MarketType } from "../utils/marketUtils";

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
      return json<ActionData>({ type: "product", product, variant: variant[0] });
    } else if (action === "fetchMarkets") {
      const markets = await fetchMarkets(admin);
      return json<ActionData>({ type: "markets", markets });
    }
    throw new Error("Invalid action");
  } catch (error) {
    return json<ActionData>({ type: "error", error: (error as Error).message }, { status: 400 });
  }
};