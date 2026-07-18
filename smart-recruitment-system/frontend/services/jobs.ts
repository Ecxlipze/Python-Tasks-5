import api from "./api";
import { Job } from "@/types/job";

export interface JobListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
}

export interface GetJobsParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const getJobs = async (
  params: GetJobsParams = {}
): Promise<JobListResponse> => {
  const { data } = await api.get("/jobs/", { params });
  return data;
};

export const createJob = async (
  payload: Partial<Job>
): Promise<Job> => {
  const { data } = await api.post("/jobs/", payload);
  return data;
};

export const updateJob = async (
  id: number,
  payload: Partial<Job>
): Promise<Job> => {
  const { data } = await api.put(`/jobs/${id}/`, payload);
  return data;
};

export const deleteJob = async (id: number) => {
  return api.delete(`/jobs/${id}/`);
};
