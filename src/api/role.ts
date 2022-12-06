import { request } from "./request";
import type { AddRoleRequest, AddRoleResponse, RoleItem, EditRoleRequest, EditRoleResponse } from "@/api/types";

export const getRoleList = () => {
  return request<never, RoleItem[]>({
    url: "/roles",
  });
};

export const deleteRoleRight = (roleId: number, rightId: number) => {
  return request<never, RoleItem[]>({
    url: `/roles/${roleId}/rights/${rightId}`,
    method: "DELETE",
  });
};

export const addRole = (data: AddRoleRequest) => {
  return request<AddRoleRequest, AddRoleResponse>({
    url: "/roles",
    method: "POST",
    data: data,
  });
};
export const editRole = (roleId: number, data: EditRoleRequest) => {
  return request<EditRoleRequest, EditRoleResponse>({
    url: `/roles/${roleId}`,
    method: "PUT",
    data: data,
  });
};

export function deleteRole(roleId: number) {
  return request<null, null>({
    url: `roles/${roleId}`,
    method: "DELETE",
  });
}
