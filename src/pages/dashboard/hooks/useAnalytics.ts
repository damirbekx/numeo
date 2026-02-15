import axiosInstance from "@/api/axiosInstance";
import { ENDPOINTS } from "@/api/endpoints";
import type { AnalyticsData } from "@/types/analytics";
import { useQuery } from "@tanstack/react-query";

const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const { data } = await axiosInstance.get<AnalyticsData>(ENDPOINTS.ANALYTICS);
  return data;
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });
};
