export async function fetchMarkets(admin: any) {
  const response = await admin.graphql(
    `#graphql
      query {
        markets(first: 250) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  );
  const responseJson = await response.json();
  return responseJson.data.markets.edges.map((edge: any) => edge.node);
}

export type MarketType = {
  id: string;
  name: string;
};