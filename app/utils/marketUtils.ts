export type MarketType = {
  id: string;
  name: string;
  region?: string;
};

export async function fetchMarkets(admin: any) {
  const response = await admin.graphql(
    `#graphql
      query {
        markets(first: 250) {
          edges {
            node {
              id
              name
              currencySettings {
                baseCurrency {
                  currencyName
                }
                localCurrencies
              }
            }
          }
        }
      }
    `
  );
  const responseJson = await response.json();
  return responseJson.data.markets.edges.map((edge: any) => edge.node);
}

const countries = [
  "US", "CA", "GB", "FR", "DE", "JP", "AU", "BR", "IN", "ZA"
] as const;

type CountryCode = typeof countries[number];

export async function createRandomMarket(admin: any): Promise<MarketType> {
  const randomName = `Market ${Math.floor(Math.random() * 1000)}`;
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  
  const inputVariables = {
    name: randomName,
    enabled: true,
    regions: [{ countryCode: randomCountry }]
  }
  const response = await admin.graphql(
    `#graphql
      mutation createMarket($input: MarketCreateInput!) {
        marketCreate(input: $input) {
          market {
            id
            name
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `,
    {
      variables: {
        input: inputVariables,
      },
    }
  );
  const responseJson = await response.json();
  const createdMarket = responseJson.data.marketCreate.market;
  
  if (!createdMarket) {
    const errors = responseJson.data.marketCreate.userErrors;
    throw new Error(`Failed to create market: ${errors.map(e => e.message).join(', ')}`);
  }

  return {
    id: createdMarket.id,
    name: createdMarket.name,
    region: randomCountry // We're using the random country as the region since it's not returned in the response
  };
}