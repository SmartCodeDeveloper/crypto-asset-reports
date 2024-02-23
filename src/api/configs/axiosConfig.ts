import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_CG_API_URL}`,
  params: {
    x_cg_demo_api_key: import.meta.env.VITE_X_CG_DEMO_API_KEY
  }
})