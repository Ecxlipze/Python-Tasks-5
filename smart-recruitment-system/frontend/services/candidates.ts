import api from "./api";
import { Candidate } from "@/types/candidate";

export interface CandidateListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Candidate[];
}

export interface GetCandidatesParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const getCandidates = async (
  params: GetCandidatesParams = {}
): Promise<CandidateListResponse> => {
  const response = await api.get("/candidates/", { params });
  return response.data;
};

export const createCandidate = async (
  payload: Partial<Candidate>
): Promise<Candidate> => {
  const { data } = await api.post("/candidates/", payload);
  return data;
};

export const updateCandidate = async (
  id: number,
  payload: Partial<Candidate>
): Promise<Candidate> => {
  const { data } = await api.put(`/candidates/${id}/`, payload);
  return data;
};

export const deleteCandidate = async (id: number) => {
  return api.delete(`/candidates/${id}/`);
};
