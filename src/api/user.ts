import { request } from "./request";
import type {
  getUserRequest,
  getUserResponse,
  changeUserStateResponse,
  addUserRequest,
  addUserResponse,
  editUserResponse,
  editUserRequest,
} from "@/api/types/user";

export const getUsers = (params: getUserRequest) => {
  return request<any, getUserResponse>({
    url: "/users",
    params,
  });
};

export const changeUserState = (uId: string, type: string) => {
  return request<any, changeUserStateResponse>({
    url: `users/${uId}/state/${type}`,
    method: "PUT",
  });
};

export const addUser = (data: addUserRequest) => {
  return request<addUserRequest, addUserResponse>({
    url: "users",
    method: "POST",
    data: data,
  });
};

export const editUser = (data: editUserRequest) => {
  return request<editUserRequest, editUserResponse>({
    url: `users/${data.id}`,
    method: "PUT",
    data: data,
  });
};

export const deleteUser = (id: number) => {
  return request({
    url: `users/${id}`,
    method: "DELETE",
  });
};
