export interface RoleItem {
  id: number;
  roleName: string;
  roleDesc: string;
  children?: RoleItem[];
}

export interface AddRoleRequest {
  roleName: string;
  roleDesc: string;
}

export interface AddRoleResponse {
  roleId: number;
  roleName: string;
  roleDesc: string;
}

export interface EditRoleRequest {
  roleName: string;
  roleDesc: string;
}

export interface EditRoleResponse {
  roleId: number;
  roleName: string;
  roleDesc: string;
}
