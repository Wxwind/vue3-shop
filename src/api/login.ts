import { request } from "./request";
import type { LoginResponse, LoginRequest } from "@/types/index";

export const login = (data: LoginRequest) => {
  return request<LoginRequest, LoginResponse>({
    url: "/login",
    method: "POST",
    data: data,
  });
};
