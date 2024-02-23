import { api } from "./configs/axiosConfig"
import { ResponseCoin } from "@/types/response/ResponseCoin"

export const CoinsApi = {
  getCoins: async function (): Promise<ResponseCoin> {
    return api.request({
      url: `/coins/markets?vs_currency=usd`,
      method: 'GET'
    })
  }
}