import api from "./api";
import { Analysis } from "@/types/analysis";

export interface AnalysisListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Analysis[];
}

export interface GetAnalysisParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const getAnalysis = async (
  params: GetAnalysisParams = {}
): Promise<AnalysisListResponse> => {
  const response = await api.get("/analysis/", { params });
  return response.data;
};

export const createAnalysis = async (payload: {
  candidate: number;
  job: number;
}): Promise<Analysis> => {
  const { data } = await api.post("/analysis/", payload);
  return data;
};
