import api from "./api";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login/", payload);
  return data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<{ username: string; email: string }> => {
  const { data } = await api.post("/auth/register/", payload);
  return data;
};
