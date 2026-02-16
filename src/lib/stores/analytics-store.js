import { create } from "zustand"
import { getCreatorAnalytics } from "@/services/analytics.service"

export const useAnalyticsStore = create((set) => ({
  loading: false,
  data: null,

  fetchAnalytics: async () => {
    set({ loading: true })
    const data = await getCreatorAnalytics()
    set({ data, loading: false })
  }
}))
