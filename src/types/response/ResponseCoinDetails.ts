export type AssetDetails = {
  id: string,
  symbol: string,
  name: string,
  description: {
    en: string
  },
  links: {
    homepage: Array<string>,
    blockchain_site: Array<string>,
    whitepaper: string,
    repos_url: {
      github: Array<string>,
    },
    subreddit_url: string
  },
  image: {
    thumb: string,
    small: string,
    large: string
  },
  market_data: {
    current_price: {
      usd: number
    },
    market_cap: {
      usd: number
    },
    fully_diluted_valuation: {
      usd: number
    },
    market_cap_rank: number,
    max_supply: number,
    total_volume: {
      usd: number
    },
    high_24h: {
      usd: number
    },
    low_24h: {
      usd: number
    },
    price_change_24h: number,
    price_change_percentage_24h: number,
    price_change_percentage_7d: number,
    price_change_percentage_14d: number,
    price_change_percentage_30d: number,
    price_change_percentage_60d: number,
    price_change_percentage_200d: number,
    price_change_percentage_1y: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    total_supply: number,
    circulating_supply: number
  }
}

export type ResponseCoinDetails = {
  data: AssetDetails,
  status: number,
  statusText: string
}