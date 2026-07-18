import api from "./api";
import { Resume } from "@/types/resume";

export interface ResumeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resume[];
}

export interface GetResumesParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export const getResumes = async (
  params: GetResumesParams = {}
): Promise<ResumeListResponse> => {
  const response = await api.get("/resumes/", { params });
  return response.data;
};

export const uploadResume = async (formData: FormData): Promise<Resume> => {
  const response = await api.post("/resumes/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
