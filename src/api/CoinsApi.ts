import { api } from "./configs/axiosConfig"
import { ResponseCoin } from "@/types/response/ResponseCoin"
import { ResponseCoinDetails } from "@/types/response/ResponseCoinDetails"

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
  }
}