// Instead, define a simple interface for the admin object
interface AdminApiContext {
  graphql: (query: string, variables?: Record<string, unknown>) => Promise<{ json: () => Promise<any> }>;
}

export type ProductType = {
  id: string;
  title: string;
  handle: string;
  status: string;
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: string;
        barcode: string;
        createdAt: string;
      };
    }>;
  };
};

export type VariantType = {
  id: string;
  price: string;
  barcode: string;
  createdAt: string;
};

export async function createProduct(admin: AdminApiContext): Promise<ProductType> {
  const color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  return responseJson.data.productCreate.product;
}

export async function updateProductVariant(admin: AdminApiContext, product: ProductType): Promise<VariantType[]> {
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();
  return variantResponseJson.data.productVariantsBulkUpdate.productVariants;
}