export type CoinMarketChartData = {
  prices: [number, number][],
  market_caps: [number, number][]
}

export type ResponseCoinMarketChartData = {
  data: CoinMarketChartData,
  status: number,
  statusText: string
}