import { api } from "./configs/axiosConfig"
import { ResponseCoin } from "@/types/response/ResponseCoin"
import { ResponseCoinDetails } from "@/types/response/ResponseCoinDetails"
import { ResponseCoinMarketChartData } from "@/types/response/ResponseCoinMarketChartData"

export const CoinsApi = {
  getCoins: async function (): Promise<ResponseCoin> {
    return api.request({
      url: `/coins/markets?vs_currency=usd`,
      method: 'GET'
    })
  },
  getCoinDetails: async function (id: string): Promise<ResponseCoinDetails> {
    return api.request({
      url: `/coins/${id}`,
      method: 'GET'
    })
  },
  getCoinMarketChartData: async function (id: string, from: string, to: string): Promise<ResponseCoinMarketChartData> {
    return api.request({
      url: `/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
      method: 'GET'
    })
  }
}